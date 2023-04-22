import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { doc, getDoc } from "firebase/firestore";
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import IEshop from '../ts/IEeshop';
//TS
interface IModifFormEshopProps {
    edit?: boolean
    id?: string
}

function ModifFormEshop(props: IModifFormEshopProps = {}) {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    //Debug - DELETABLE
    console.log("ModifFormEshop props")
    console.log(props)
    const [country, setCountry] = useState("CZ");
    ////Uncontrolled Form Handling via. ref& s
    const inputName = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    //const inputCountry = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);
    ////
    //Data Handling Functions w/ Firebase
    const UpdateEshop = () => {
        console.log("UpdateEshop()")
    }
    const AddEshop = () => {
        console.log("AddEshop()")
        const _eshop: IEshop = { name: inputName?.current!.value, description: inputDescription?.current!.value, country: "CZ", url: inputUrl?.current!.value, owner: user?.uid }
        console.log(_eshop)
    }
    const getEshop = async (db: any, id: any) => {
        const eshopId = id; // replace with the ID of the e-shop you want to retrieve
        const eshopRef = doc(db, 'eshops', eshopId);
        const eshopSnapshot = await getDoc(eshopRef);
        if (eshopSnapshot.exists()) {
            const eshopData = eshopSnapshot.data();
            //console.log(eshopData)
            return eshopData
        } else {
            console.log(`No e-shop found with ID ${eshopId}`);
            return null
        }
    }
    //Upon loading do
    useEffect(() => {
        console.log("useEffect()")
        if (props.edit) {
            //if props.edit{ FETCH& load stuff into 4 fields }
            console.log("edit")
            console.log(props.id)
            const eshop_promise = getEshop(db, props.id)
            Promise.resolve(eshop_promise)
                .then((result) => {
                    console.log("result")
                    console.log(result)
                    //
                    inputName.current!.value = result!.name
                    inputDescription.current!.value = result!.description
                    setCountry(result!.country)
                    inputUrl.current!.value = result!.url
                })
                .catch((e: any) => {
                    console.log(e)
                })
            //inputName.current!.value = "_eshop.name"
        }
    })
    return (
        <>
            <Container>
                {/*<span>modif form eshop cz w/o flag</span>*/}
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
                                {/*hopefully ref={inputName}*/}
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
                                {/*hopefully ref={inputDescription}*/}
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
                                {/*hopefully ref={inputName}*/}
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
                                {/*hopefully ref={inputUrl}/*/}
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
                {/*<div className="alignCenter">
                        <span className="btnStyle ptHover" onClick={() => { console.log("ADD") }} > ADD </span>
</div>*/}
                <span>&nbsp;</span>
            </Container >
        </>
    )
}
export default ModifFormEshop