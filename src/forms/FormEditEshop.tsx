import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModifFormEshop from "./ModifFormEshop";
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";
import IEshop from "../ts/IEeshop";

type FormEditEshopProps = {
    closeModal: () => void;  // Add this prop
    eshop: IEshop;
}

const FormEditEshop: React.FC<FormEditEshopProps> = ({ closeModal, eshop }) => {
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
                <ModifFormEshop FuncCancel={closeModal} edit={true} eshop={eshop} />
            </Box>
        </React.Fragment>
    );
}
//<ModifFormEshop edit={true} />
export default FormEditEshop;