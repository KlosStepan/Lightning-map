import React from "react";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Forms
import ModifFormEshop from "./ModifFormEshop";
//TypeScript
import IEshop from "../ts/IEeshop";
//Redux/RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from "./stylesForm";

type FormEditEshopProps = {
    closeModal: () => void;
    eshop: IEshop;
    documentid: string; // ✅ Accept document ID
};

const FormEditEshop: React.FC<FormEditEshopProps> = ({ closeModal, eshop, documentid }) => {
    // DEBUG
    const debug = useSelector((state: RootState) => state.misc.debug);
       
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
                { debug ? (<div><span style={{ border: '1px solid black', padding: '1px' }}>documentid={documentid}</span></div>) : null } {/* ✅ Display for testing */}
                <ModifFormEshop FuncCancel={closeModal} edit={true} eshop={eshop} documentid={documentid} />
            </Box>
        </React.Fragment>
    );
};

export default FormEditEshop;