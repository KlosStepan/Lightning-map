import React, { useEffect, useRef } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../components/Firebase"
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import IEshop from '../ts/IEeshop';
//TS
interface IModifFormEshopProps {
    edit?: boolean
    eshop?: IEshop | null
}

function ModifFormEshop(props: IModifFormEshopProps = {}) {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    //Debug - DELETABLE
    console.log("ModifFormEshop props")
    console.log(props)
    ////Uncontrolled Form Handling via. ref& s
    const inputName = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    const inputCountry = useRef<HTMLInputElement>(null);
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
    //Upon loading do
    useEffect(() => {
        console.log("useEffect()")
        if (props.edit) {
            //if props.edit{ FETCH& load stuff into 4 fields }
            console.log("edit")
            console.log(props.eshop)
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