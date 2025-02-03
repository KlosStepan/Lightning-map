import React from "react";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Forms
import ModifFormEshop from "./ModifFormEshop";
//TypeScript
import IEshop from "../ts/IEeshop";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";

type FormEditEshopProps = {
    closeModal: () => void;
    eshop: IEshop;
}

const FormEditEshop: React.FC<FormEditEshopProps> = ({ closeModal, eshop }) => {
    return (
        <React.Fragment>
            <Box sx={modalContainerStyle}>
                <Typography id="modal-modal-title" variant="h1" component="h2" style={modalTitleStyle}>
                    <span>Edit e-shop</span>
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
};

export default FormEditEshop;