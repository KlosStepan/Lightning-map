import React, { useEffect, useRef, useState } from 'react';
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
//Firebase stuff
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
//TypeScript
import IEshop from '../ts/IEeshop';

//Typed props
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

    //OUR FETCH/SAVE FUNCTION
    const AddEshop = async () => {
        const _eshop: IEshop = _BundleEshop();
        //console.log("AddEshop(), Firebase -> INSERT")
        //console.log(_eshop);

        //Collection Ref->ADD
        const eshopCollectionRef = collection(db, "eshops");
        addDoc(eshopCollectionRef, _eshop)
            .then((docRef) => {
                console.log("Eshop added successfully! Document reference: ", docRef);
            })
            .catch((error) => {
                console.error("Error adding eshop: ", error);
            });
    }
    const FetchEshop = async (db: any, id: any) => {
        const eshopId = id;
        const eshopRef = doc(db, "eshops", eshopId);
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
    const UpdateEshop = async () => {
        const _eshop: IEshop = _BundleEshop();
        //console.log(`UpdateEshop(), Firebase -> UPDATE/${props.id}`)
        //console.log(_eshop);

        //Eshop Ref->UPDATE
        const eshopDocRef = doc(db, "eshops", props.id as string)
        try {
            await updateDoc(eshopDocRef, { ..._eshop });
            console.log("Eshop updated successfully!");
        } catch (error) {
            console.error("Error updating eshop: ", error);
        }
    }
    //INTERNAL BUNDLING FUNCTION
    const _BundleEshop = () => {
        const _eshop: IEshop = {
            name: inputName?.current!.value,
            description: inputDescription?.current!.value,
            country: "CZ",
            url: inputUrl?.current!.value,
            owner: user?.uid
        }
        return _eshop;
    }
    //useEffect
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
    }, [])

    //COMPONENT JSX FRAGMENT
    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th className='justWrap'><span className="btnStyle ptHover" onClick={() => { navigate(-1) }} > &lt; BACK </span></th>
                        <th>&nbsp;</th>
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