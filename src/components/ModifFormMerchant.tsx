import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
//Firebase stuff
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
//Map stuff
import Map, { Marker, NavigationControl } from 'react-map-gl';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
//import ControlPanel from './ControlPanel';
import Pin from './pin';
//TypeScript
import IMerchant from '../ts/IMerchant';

//Token variable and default settings for map camera
const TOKEN = 'pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ';
const initialViewState = {
    latitude: 50.065,
    longitude: 14.498,
    zoom: 10.25
};

//Typed props
interface IModifFormMerchantProps {
    edit?: boolean
    id?: string
}

function ModifFormMerchant(props: IModifFormMerchantProps = {}) {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    //console.log("<ModifFormMerchant /> props")
    //console.log(props)

    ////FORM STUFF
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState<boolean>(false);
    //Lng Lat X,Y - onDropEnd
    const [coordX, setCoordX] = useState<number>(14.498);
    const [coordY, setCoordY] = useState<number>(50.065);
    //Working version of marker
    const [marker, setMarker] = useState({
        latitude: 50.065,
        longitude: 14.498
    });
    ////FORM STUFF

    //FORM MAP Event Functions
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

    //OUR FETCH/SAVE FUNCTION
    const AddMerchant = () => {
        const _merchant: IMerchant = _BundleMerchant();
        //console.log("AddMerchant(), Firebase -> INSERT");
        //console.log(_merchant);

        //Collection Ref->ADD
        const merchantsCollectionRef = collection(db, "merchants");
        addDoc(merchantsCollectionRef, _merchant)
            .then((docRef) => {
                console.log("Merchant added successfully! Document reference: ", docRef);
            })
            .catch((error) => {
                console.error("Error adding merchant: ", error);
            });
    }
    const FetchMerchant = async (db: any, id: any) => {
        const merchantId = id;
        const merchantRef = doc(db, 'merchants', merchantId);
        const merchantSnapshot = await getDoc(merchantRef);
        if (merchantSnapshot.exists()) {
            const merchantData = merchantSnapshot.data();
            //console.log(merchantData)
            return merchantData;
        } else {
            console.log(`No merchant found with ID ${merchantId}`);
            return null;
        }
    }
    const UpdateMerchant = async () => {
        const _merchant: IMerchant = _BundleMerchant();
        console.log(`UpdateMerchant(), Firebase -> UPDATE/${props.id}`);
        console.log(_merchant);

        //Merchant Ref->UPDATE
        const merchantDocRef = doc(db, "merchants", props.id as string)
        try {
            await updateDoc(merchantDocRef, { ..._merchant });
            console.log("Merchant updated successfully!");
        } catch (error) {
            console.error("Error updating merchant: ", error);
        }
    }
    //INTERNAL BUNDLING FUNCTION
    const _BundleMerchant = () => {
        const _merchant: IMerchant = {
            geometry: {
                coordinates: [coordX, coordY],
                type: "Point"
            },
            properties: {
                description: inputDescription?.current!.value,
                owner: user?.uid,
                title: inputTitle?.current!.value,
                visible: visible
            },
            type: "Feature"
        };
        return _merchant;
    }
    //useEffect
    useEffect(() => {
        //console.log("<ModifFormMerchant /> useEffect()")
        if (props.edit) {
            //console.log("edit")
            //console.log(props.id)
            const merchant_promise = FetchMerchant(db, props.id)
            Promise.resolve(merchant_promise)
                .then((result) => {
                    //console.log("Fetched merchant")
                    //console.log(result)
                    inputTitle.current!.value = result!.properties.title
                    inputDescription.current!.value = result!.properties.description
                    setVisible(result!.properties.visible)
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

    //COMPONENT JSX FRAGMENT
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
                        <tr>
                            <th className='justWrap'>VISIBLE</th>
                            <td>
                                <Input
                                    disabled
                                    type="textarea"
                                    rows="1"
                                    value={+visible}
                                />
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

export default ModifFormMerchant;