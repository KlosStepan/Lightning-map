import React from "react";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Styles
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";
//Icons
import closeIcon from '../icons/close.png';

type FormADAddProps = {
    closeModal: () => void;
}

const FormADAdd: React.FC<FormADAddProps> = ({ closeModal }) => {
    return (
        <Box sx={modalContainerStyle}>
            <Typography id="modal-modal-title" variant="h1" component="h2" style={modalTitleStyle}>
                <span>Add</span>
                <span onClick={closeModal}>
                    <Box
                        component="img"
                        src={closeIcon}
                        alt="Close Icon"
                        sx={closeIconStyle}
                    />
                </span>
            </Typography>
            <div style={{ textAlign: "center" }}>|Merch t| &nbsp;|Eshop t|</div>
        </Box>
    );
}

export default FormADAdd;
