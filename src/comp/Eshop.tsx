import React from 'react'
function Eshop(props: any) {
    return (
        <div ><b>{props.eshop.name}</b> - <span>{props.eshop.description}</span> <a href={props.eshop.url} target="_blank">{props.eshop.url}</a></div>
    )
}
export default Eshop