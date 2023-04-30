import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { doc, getDoc } from "firebase/firestore";
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
//TypeScript
import IEshop from '../ts/IEeshop';
interface IModifFormEshopProps {
    edit?: boolean
    id?: string
}

function ModifFormEshop(props: IModifFormEshopProps = {}) {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    //console.log("<ModifFormEshop /> props")
    //console.log(props)

    ////FORM STUFF
    const inputName = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    const [country, setCountry] = useState("CZ");
    const inputUrl = useRef<HTMLInputElement>(null);
    ////FORM STUFF

    //Our Fetch/Save functions
    const UpdateEshop = () => {
        console.log(`UpdateEshop(), Firebase -> UPDATE/${props.id}`)
        const _eshop: IEshop = _BundleEshop();
        console.log(_eshop);
        //SOMEHOW UPDATE
    }
    const AddEshop = () => {
        console.log("AddEshop(), Firebase -> INSERT")
        const _eshop: IEshop = _BundleEshop();
        console.log(_eshop);
        //addDoc TODO
    }
    const FetchEshop = async (db: any, id: any) => {
        const eshopId = id;
        const eshopRef = doc(db, 'eshops', eshopId);
        const eshopSnapshot = await getDoc(eshopRef);
        if (eshopSnapshot.exists()) {
            const eshopData = eshopSnapshot.data();
            //console.log(eshopData)
            return eshopData;
        } else {
            console.log(`No e-shop found with ID ${eshopId}`);
            return null;
        }
    }
    const _BundleEshop = () => {
        const _eshop: IEshop = {
            name: inputName?.current!.value,
            description: inputDescription?.current!.value,
            country: "CZ", url: inputUrl?.current!.value,
            owner: user?.uid
        }
        return _eshop;
    }

    //useEffect&Component
    useEffect(() => {
        //console.log("<ModifFormEshop /> useEffect()")
        if (props.edit) {
            //console.log("edit")
            //console.log(props.id)
            const eshop_promise = FetchEshop(db, props.id)
            Promise.resolve(eshop_promise)
                .then((result) => {
                    //console.log("Fetched e-shop")
                    //console.log(result)
                    inputName.current!.value = result!.name
                    inputDescription.current!.value = result!.description
                    setCountry(result!.country)
                    inputUrl.current!.value = result!.url
                })
                .catch((e: any) => {
                    console.log(e)
                })
        }
    })
    return (
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
                        <th className='justWrap'>NAME</th>
                        <td>
                            <Input
                                type="textarea"
                                rows="1"
                                innerRef={inputName}
                            //ref={inputName}
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
                        <th className='justWrap'>COUNTRY</th>
                        <td>
                            <Input
                                disabled
                                type="textarea"
                                rows="1"
                                value={country}
                            //ref={inputName}
                            //value={(formKod) ? formKod : ""}
                            //onChange={(e: any) => { setFormKod(e.target.value) }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className='justWrap'>URL</th>
                        <td>
                            <Input
                                type="textarea"
                                rows="1"
                                innerRef={inputUrl}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="alignCenter">
                {(props.edit)
                    ? <span className="btnStyle ptHover" onClick={() => { UpdateEshop() }} > UPDATE </span>
                    : <span className="btnStyle ptHover" onClick={() => { AddEshop() }} > ADD </span>}
            </div>
            <span>&nbsp;</span>
        </Container >
    )
}

export default ModifFormEshop;