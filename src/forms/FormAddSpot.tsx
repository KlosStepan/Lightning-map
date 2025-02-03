import React from "react";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Forms
import ModifFormSpot from "./ModifFormSpot";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";

type FormAddSpotProps = {
    closeModal: () => void;
};

const FormAddSpot: React.FC<FormAddSpotProps> = ({ closeModal }) => {
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
                <ModifFormSpot FuncCancel={closeModal} />
            </Box>
        </React.Fragment>
    );
};

export default FormAddSpot;
