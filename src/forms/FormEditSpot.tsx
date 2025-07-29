import React from "react";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Forms
import ModifFormSpot from "./ModifFormSpot";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
//Redux/RTK
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";

type FormEditSpotProps = {
    closeModal: () => void;
    merchant: IMerchantTile;
    documentid: string; // ✅ Accept document ID
};

const FormEditSpot: React.FC<FormEditSpotProps> = ({ closeModal, merchant, documentid }) => {
    // DEBUG
    const debug = useSelector((state: RootState) => state.misc.debug);
       
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
                { debug ? (<div><span style={{ border: '1px solid black', padding: '1px' }}>documentid={documentid}</span></div>) : null } {/* ✅ Display for testing */}
                <ModifFormSpot FuncCancel={closeModal} edit={true} merchant={merchant} documentid={documentid} />
            </Box>
        </React.Fragment>
    );
};

export default FormEditSpot;