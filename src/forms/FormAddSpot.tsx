import React from "react";
import ModifFormSpot from "./ModifFormSpot";

type FormAddSpotProps = {
    closeModal: () => void;  // Add this prop
}

const FormAddSpot: React.FC<FormAddSpotProps> = ({ closeModal }) => {
    //Send stuff in here
    return (
        <React.Fragment>
            <ModifFormSpot />
        </React.Fragment>
    )
}
export default FormAddSpot;