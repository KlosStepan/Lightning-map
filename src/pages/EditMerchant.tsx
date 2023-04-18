import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModifFormMerchant from '../components/ModifFormMerchant';

function EditMerchant() {
    let { id } = useParams()
    console.log("id is: " + id)
    useEffect(() => {
        console.log("useEffect");
    }, [])
    return (
        <>
            <span>stuff</span>
            <ModifFormMerchant edit={true} />
        </>
    )
}
export default EditMerchant