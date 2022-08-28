import React from 'react'
import Eshop from './Eshop'
import { useSelector } from 'react-redux';
function Eshopscz() {
    const eshopscz = useSelector((state: any) => state.allReducers.eshopscz);
    console.log("eshops cz")
    console.log(eshopscz)
    return (<div>
        <h1>Eshops</h1>
        <div className="alignLeft">
            {eshopscz.map((eshop: any) => <Eshop eshop={eshop} />)}
        </div>
        <div><p>&nbsp;</p></div>
    </div>)
}
export default Eshopscz