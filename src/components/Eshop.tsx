import React from 'react';

function Eshop(props: any) {
    //console.log(props)
    return (
        <tr key={props.key}>
            <td>{props.eshop.name}</td>
            <td>{props.eshop.description}</td>
            <td><a href={props.eshop.url} target="_blank" rel="noreferrer">{props.eshop.url}</a></td>
        </tr>
    )
}

export default Eshop;