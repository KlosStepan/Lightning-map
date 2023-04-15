import React from 'react';
import { Container, Input, Table } from 'reactstrap';
function ModifFormEshop(props: any) {
    console.log("ModifFormEshop props")
    console.log(props)
    //if props.edit{ load 4 fields }
    return (
        <>
            <Container>
                <div>
                    {/*<span>modif form eshop cz w/o flag</span>*/}
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
                                <th className='justWrap'>URL</th>
                                <td>
                                    <Input
                                        type="textarea"
                                        rows="1"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    { /*(props.edit)
              ? <span className="katBtnStyle ptHover" onClick={() => {UpdateDoplnek()}} > AKTUALIZOVAT </span>
    : <span className="katBtnStyle ptHover" onClick={() => {AddDoplnek()}} > PŘIDAT </span>*/}
                    <div className="alignCenter">
                        <span className="btnStyle ptHover" onClick={() => { console.log("ADD") }} > ADD </span>
                    </div>
                    <span>&nbsp;</span>
                </div>
            </Container>
        </>
    )
}
export default ModifFormEshop