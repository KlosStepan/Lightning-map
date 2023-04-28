import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { doc, getDoc } from "firebase/firestore";
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import Pin from './pin';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
//import ControlPanel from './ControlPanel';
//TS
import IMerchant from '../ts/IMerchant';
interface IModifFormMerchantProps {
    edit?: boolean
    id?: string
}
const TOKEN = 'pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ'; // Set your mapbox token here

const initialViewState = {
    latitude: 50.065,
    longitude: 14.498,
    zoom: 10.25
};

function ModifFormMerchant(props: IModifFormMerchantProps = {}) {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    //console.log("<ModifFormMerchant /> props")
    //console.log(props)
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    //Lng Lat X,Y - onDropEnd
    const [coordX, setCoordX] = useState<number>(14.498);
    const [coordY, setCoordY] = useState<number>(50.065);
    //Working version of marker
    const [marker, setMarker] = useState({
        latitude: 50.065,
        longitude: 14.498
    });
    const [events, logEvents] = useState<Record<string, LngLat>>({});

    const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
        logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
    }, []);

    const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
        logEvents(_events => ({ ..._events, onDrag: event.lngLat }));

        setMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat
        });
    }, []);

    const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
        logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
        console.log(`${event.lngLat.lng}, ${event.lngLat.lat}`)
        setCoordX(event.lngLat.lng)
        setCoordY(event.lngLat.lat)
    }, []);
    const UpdateMerchant = () => {
        console.log(`UpdateMerchant(), Firebase -> UPDATE/${props.id}`)
        const _merchant: IMerchant = _BundleMerchant();
        console.log(_merchant)
    }
    const AddMerchant = () => {
        console.log("AddMerchant(), Firebase -> INSERT")
        const _merchant: IMerchant = _BundleMerchant();
        console.log(_merchant)
    }
    const FetchMerchant = async (db: any, id: any) => {
        const merchantId = id;
        const merchantRef = doc(db, 'merchants', merchantId);
        const merchantSnapshot = await getDoc(merchantRef);
        if (merchantSnapshot.exists()) {
            const merchantData = merchantSnapshot.data();
            //console.log(merchantData)
            return merchantData
        }
        else {
            console.log(`No merchant found with ID ${merchantId}`);
            return null
        }
    }
    const _BundleMerchant = () => {
        const _merchant: IMerchant = {
            geometry: {
                coordinates: [coordX, coordY],
                type: "Point"
            },
            properties: {
                description: inputDescription?.current!.value,
                owner: user?.uid,
                title: inputTitle?.current!.value
            },
            type: "Feature"
        };
        return _merchant
    }
    useEffect(() => {
        console.log("<ModifFormMerchant /> useEffect()")
        if (props.edit) {
            //console.log("edit")
            //console.log(props.id)
            const merchant_promise = FetchMerchant(db, props.id)
            Promise.resolve(merchant_promise)
                .then((result) => {
                    console.log("Fetched merchant")
                    console.log(result)
                    inputTitle.current!.value = result!.properties.title
                    inputDescription.current!.value = result!.properties.description
                    setCoordX(result!.geometry.coordinates[0])
                    setCoordY(result!.geometry.coordinates[1])
                    setMarker({
                        longitude: result!.geometry.coordinates[0],
                        latitude: result!.geometry.coordinates[1]
                    });
                })
                .catch((e: any) => {
                    console.log(e)
                })
        }
    }, [])
    return (
        <>
            <style type="text/css">
                {`
            .mapboxgl-map {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
                height: 300px !important;
                }
            `}
            </style>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th className='justWrap'><span className="btnStyle ptHover" onClick={() => { navigate(-1) }} > &lt; BACK </span></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='justWrap'>TITLE</th>
                            <td>
                                <Input
                                    type="textarea"
                                    rows="1"
                                    innerRef={inputTitle}
                                //value={(formKod) ? formKod : ""}
                                //onChange={(e: any) => { setFormKod(e.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className='justWrap'>DESCRIPTION</th>
                            <td>
                                <Input
                                    type="textarea"
                                    rows="5"
                                    innerRef={inputDescription}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>PLACE</th>
                            {/*<td>map box to pick x <b>{coordX}</b> and y <b>{coordY}</b></td>*/}
                            <td>
                                <Map
                                    initialViewState={initialViewState}
                                    mapStyle="mapbox://styles/pwnstepo/cl7aiq2qd003g15nqmwwpyglr"
                                    mapboxAccessToken={TOKEN}
                                >
                                    <Marker
                                        longitude={marker.longitude}
                                        latitude={marker.latitude}
                                        anchor="bottom"
                                        draggable
                                        onDragStart={onMarkerDragStart}
                                        onDrag={onMarkerDrag}
                                        onDragEnd={onMarkerDragEnd}
                                    >
                                        <Pin size={20} />
                                    </Marker>
                                    <NavigationControl />
                                </Map>
                                {/*<ControlPanel events={events} />*/}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="alignCenter">
                    {(props.edit)
                        ? <span className="btnStyle ptHover" onClick={() => { UpdateMerchant() }} > UPDATE </span>
                        : <span className="btnStyle ptHover" onClick={() => { AddMerchant() }} > ADD </span>}
                </div>
                <span>&nbsp;</span>
            </Container>
        </>
    )
}
export default ModifFormMerchant