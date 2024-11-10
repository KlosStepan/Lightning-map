import React from "react";
import ModifFormSpot from "./ModifFormSpot";

type FormEditSpotProps = {
    closeModal: () => void;  // Add this prop
}

const FormEditSpot: React.FC<FormEditSpotProps> = ({ closeModal }) => {
    //Send stuff in here
    return (
        <React.Fragment>
            <ModifFormSpot edit={true} FuncCancel={closeModal} />
        </React.Fragment>
    )
}
export default FormEditSpot;