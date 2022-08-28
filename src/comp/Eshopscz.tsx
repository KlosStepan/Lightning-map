import React from 'react'
import Eshop from './Eshop'
function Eshopscz(props: any) {
    console.log("eshopscz props")
    console.log(props)
    return (<div>
        <span>Eshops</span>
        {props.list.map((shop: any) => { <Eshop shop={shop} /> })}
    </div>)
}
export default Eshopscz