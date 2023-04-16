import React, { useEffect } from 'react';
import { Container, Input, Table } from 'reactstrap';
import IMerchant from '../ts/IMerchant';

interface IModifFormMerchantProps {
    edit?: boolean
    merchant?: IMerchant
}
function ModifFormMerchant(props: IModifFormMerchantProps = {}) {
    console.log("ModifFormEshop props")
    console.log(props)
    //if props.edit{ load 4 fields }
    useEffect(() => {
        console.log("useEffect()")
        if (props.edit) {
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
                                <th className='justWrap'><span className="btnStyle ptHover" onClick={() => { /*navigate(-1)*/ }} > &lt; BACK </span></th>
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
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>place</th>
                                <td>map box to pick x, y</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}
export default ModifFormMerchant