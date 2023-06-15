import React from 'react'
import Eshop from '../components/Eshop'
import { Table } from 'reactstrap';
import { useSelector } from 'react-redux';

function Eshopscz() {
    const eshopscz = useSelector((state: any) => state.allReducers.eshopscz);
    //console.log("eshops cz")
    //console.log(eshopscz)
    return (
        <div>
            <h1 className="title">E-shops</h1>
            <hr />
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-shop Description</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {eshopscz.map((eshop: any, key: number) => <Eshop eshop={eshop} key={key} />)}
                </tbody>
            </Table>
        </div>
    )
}
export default Eshopscz