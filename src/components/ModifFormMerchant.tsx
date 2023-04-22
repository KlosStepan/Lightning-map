import React, { useEffect, useRef, useState } from 'react';
import { Container, Input, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import IMerchant from '../ts/IMerchant';
//TS
interface IModifFormMerchantProps {
    edit?: boolean
    merchant?: IMerchant | null
}

function ModifFormMerchant(props: IModifFormMerchantProps = {}) {
    const navigate = useNavigate();
    //Debug - DELETABLE
    console.log("ModifFormEshop props")
    console.log(props)
    ////Uncontrolled Form Handling via. ref& s
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLInputElement>(null);
    ////
    const [coordX, setCoordX] = useState<number>(14.4483);
    const [coordY, setCoordY] = useState<number>(50.1033);
    //Data Handling Functions w/ Firebase
    const UpdateMerchant = () => {
        console.log("UpdateMerchant()")
    }
    const AddMerchant = () => {
        console.log("AddMerchant()")
        const _merchant: IMerchant = { geometry: { coordinates: [coordX, coordY], type: "Point" }, properties: { description: inputDescription?.current!.value, owner: "UID", title: inputTitle?.current!.value }, type: "Feature" };
        console.log(_merchant)
    }
    useEffect(() => {
        console.log("useEffect()")
        if (props.edit) {
            //if props.edit{ load 4 fields }
            console.log("edit")
            console.log(props.merchant)
        }
    })
    return (
        <>
            <Container>
                <div>
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
                </div>
            </Container>
        </>
    )
}
export default ModifFormMerchant