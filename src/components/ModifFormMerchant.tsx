import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { doc, getDoc } from "firebase/firestore";
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import IMerchant from '../ts/IMerchant';
//TS
interface IModifFormMerchantProps {
    edit?: boolean
    id?: string
}

function ModifFormMerchant(props: IModifFormMerchantProps = {}) {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    //Debug - DELETABLE
    console.log("ModifFormEshop props")
    console.log(props)
    ////Uncontrolled Form Handling via. ref& s
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    ////
    const [coordX, setCoordX] = useState<number>(15.1111);
    const [coordY, setCoordY] = useState<number>(51.2222);
    //Data Handling Functions w/ Firebase
    const UpdateMerchant = () => {
        console.log("UpdateMerchant()")
    }
    const AddMerchant = () => {
        console.log("AddMerchant()")
        const _merchant: IMerchant = { geometry: { coordinates: [coordX, coordY], type: "Point" }, properties: { description: inputDescription?.current!.value, owner: user?.uid, title: inputTitle?.current!.value }, type: "Feature" };
        console.log(_merchant)
    }
    const getMerchant = async (db: any, id: any) => {
        const merchantId = id; // replace with the ID of the merchant you want to retrieve
        const merchantRef = doc(db, 'merchants', merchantId);
        const merchantSnapshot = await getDoc(merchantRef);
        if (merchantSnapshot.exists()) {
            const merchantData = merchantSnapshot.data();
            //console.log(merchantData)
            return merchantData
        } else {
            console.log(`No merchant found with ID ${merchantId}`);
            return null
        }
    }
    //Upon loading do
    useEffect(() => {
        console.log("useEffect()")
        if (props.edit) {
            //if props.edit{ FETCH& load 4 fields }
            console.log("edit")
            console.log(props.id)
            const merchant_promise = getMerchant(db, props.id)
            Promise.resolve(merchant_promise)
                .then((result) => {
                    console.log("result")
                    console.log(result)
                    //
                    inputTitle.current!.value = result!.properties.title
                    inputDescription.current!.value = result!.properties.description
                    setCoordX(result!.geometry.coordinates[0])
                    setCoordY(result!.geometry.coordinates[1])
                })
                .catch((e: any) => {
                    console.log(e)
                })
        }
    })
    return (
        <>
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
                            <th>place</th>
                            <td>map box to pick x <b>{coordX}</b> and y <b>{coordY}</b></td>
                        </tr>
                    </tbody>
                </Table>
                <div className="alignCenter">
                    {(props.edit)
                        ? <span className="btnStyle ptHover" onClick={() => { UpdateMerchant() }} > UPDATE </span>
                        : <span className="btnStyle ptHover" onClick={() => { AddMerchant() }} > ADD </span>}
                </div>
            </Container>
        </>
    )
}
export default ModifFormMerchant