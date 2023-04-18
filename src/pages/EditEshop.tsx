import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModifFormEshop from '../components/ModifFormEshop';

function EditEshop() {
    let { id } = useParams()
    console.log("id is: " + id)
    useEffect(() => {
        console.log("useEffect");
    }, [])
    return (
        <>
            <span>stuff</span>
            <ModifFormEshop edit={true} />
        </>
    )
}
export default EditEshop