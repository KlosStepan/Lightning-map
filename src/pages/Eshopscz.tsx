import React from 'react'
import Eshop from '../components/Eshop'
import { Table } from 'reactstrap';
import { useSelector } from 'react-redux';
function Eshopscz() {
    const eshopscz = useSelector((state: any) => state.allReducers.eshopscz);
    console.log("eshops cz")
    console.log(eshopscz)
    return (<div>
        <h1>Eshops</h1>
        <Table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>url</th>
                </tr>
            </thead>
            <tbody>
                {eshopscz.map((eshop: any) => <Eshop eshop={eshop} />)}
            </tbody>
        </Table>
    </div>)
}
export default Eshopscz