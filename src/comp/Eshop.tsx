import React from 'react';
function Eshop(props: any) {
    return (
        <tr >
            <td>{props.eshop.name}</td><td>{props.eshop.description}</td><td><a href={props.eshop.url} target="_blank">{props.eshop.url}</a></td>
        </tr>
    )
}
export default Eshop