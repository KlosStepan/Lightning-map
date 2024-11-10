import React from "react";
import ModifFormEshop from "./ModifFormEshop";

type FormEditEshopProps = {
    closeModal: () => void;  // Add this prop
}

const FormEditEshop: React.FC<FormEditEshopProps> = ({ closeModal }) => {
    //Send stuff in here
    return (
        <React.Fragment>
            <ModifFormEshop edit={true} />
        </React.Fragment>
    )
}
export default FormEditEshop;