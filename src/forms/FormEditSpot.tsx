import React from "react";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Forms
import ModifFormSpot from "./ModifFormSpot";
//TypeScript
import IMerchant, { IMerchantTile } from "../ts/IMerchant";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";

type FormEditSpotProps = {
    closeModal: () => void;
    merchant: IMerchantTile;
}

const FormEditSpot: React.FC<FormEditSpotProps> = ({ closeModal, merchant }) => {
    return (
        <React.Fragment>
            <Box sx={modalContainerStyle}>
                <Typography id="modal-modal-title" variant="h1" component="h2" style={modalTitleStyle}>
                    <span>Edit spot</span>
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
};

export default FormEditSpot;