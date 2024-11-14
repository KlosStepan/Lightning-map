import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModifFormEshop from "./ModifFormEshop";
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from './stylesForm';

type FormAddEshopProps = {
    closeModal: () => void;
};

const FormAddEshop: React.FC<FormAddEshopProps> = ({ closeModal }) => {
    return (
        <React.Fragment>
            <Box sx={modalContainerStyle}>
                <Typography id="modal-modal-title" variant="h1" component="h2" style={modalTitleStyle} >
                    <span>New e-shop</span>
                    <span onClick={closeModal}>
                        <Box
                            component="img"
                            src={closeIcon}
                            alt="Close Icon"
                            sx={closeIconStyle}
                        />
                    </span>
                </Typography>
                <ModifFormEshop FuncCancel={closeModal} />
            </Box>
        </React.Fragment>
    );
};

export default FormAddEshop;
