import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModifFormSpot from "./ModifFormSpot";
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";
import IMerchant, { IMerchantTile } from "../ts/IMerchant";

type FormEditSpotProps = {
    closeModal: () => void;  // Add this prop
    merchant: IMerchantTile;
}

const FormEditSpot: React.FC<FormEditSpotProps> = ({ closeModal, merchant }) => {
    return (
        <React.Fragment>
            <Box sx={modalContainerStyle}>
                <Typography id="modal-modal-title" variant="h1" component="h2" style={modalTitleStyle}>
                    <span>New spot</span>
                    <span onClick={closeModal}>
                        <Box
                            component="img"
                            src={closeIcon}
                            alt="Close Icon"
                            sx={closeIconStyle}
                        />
                    </span>
                </Typography>
                <ModifFormSpot FuncCancel={closeModal} edit={true} merchant={merchant} />
            </Box>
        </React.Fragment>
    );
}
//<ModifFormSpot edit={true} FuncCancel={closeModal} />
export default FormEditSpot;