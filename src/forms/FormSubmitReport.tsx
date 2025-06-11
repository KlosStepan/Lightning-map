import React, { useRef } from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
// Firebase (modular imports)
import { getFirestore, collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";
//import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
//import { db } from "../firebase/config"; // Ensure you import Firestore instance
import { auth, db } from "../components/Firebase";
//MUI
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import IReport from "../ts/IReport";
import IEshop from "../ts/IEshop";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from './stylesForm';
import { ButtonColor } from "../enums";

type FormSubmitReportProps = {
    closeModal?: () => void;
    tile: IMerchantTile | IEshop; // <- TODO documentid somehow
}

const FormSubmitReport: React.FC<FormSubmitReportProps> = ({ closeModal, tile }) => {
    //
    const user = useSelector((state: RootState) => state.misc.user);

    const reportRef = useRef<HTMLInputElement>(null);

    const SubmitReport = async () => {
        if (!user) {
            console.error("User not logged in.");
            return;
        }
    
        try {
            const _vid = tile.id;
            const _uid = user.uid;
    
            const reportData: Omit<IReport, "timestamp"> & { timestamp: any } = {
                vendorid: _vid,
                userid: _uid,
                timestamp: serverTimestamp(), // 🔥 Firestore will generate the timestamp
                report: reportRef.current?.value || "",
            };
    
            const docRef = await addDoc(collection(db, "reports"), reportData);
            console.log("Report submitted successfully. Document ID:", docRef.id);
        } catch (error) {
            console.error("Error submitting report:", error);
        }
    };
    return (
        <React.Fragment>
            <Box sx={modalContainerStyle}>
                <Typography id="modal-modal-title" variant="h1" component="h2" style={modalTitleStyle} >
                    <span>Submit report about {tile.name}</span>
                    <span onClick={closeModal}>
                        <Box
                            component="img"
                            src={closeIcon}
                            alt="Close Icon"
                            sx={closeIconStyle}
                        />
                    </span>
                </Typography>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Report</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        inputRef={reportRef}
                        defaultValue={""}
                        multiline // Enable multiline for the description field
                        minRows={3} // Set the default number of rows to 3
                        maxRows={5} // Optionally, set a maximum number of rows to expand to
                    />
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                {closeModal && (
                    <ButtonUniversal 
                        title="Cancel" 
                        color={ButtonColor.Purple}
                        //color="#8000FF"
                        hoverColor={ButtonColor.PurpleHover}
                        //hoverColor="#6603C9"
                        textColor="white" 
                        actionDelegate={closeModal} 
                    />
                )}
                <ButtonUniversal
                    title="Submit"
                    color={ButtonColor.Purple}
                    //color="#F23CFF"
                    hoverColor={ButtonColor.PurpleHover}
                    //hoverColor="#DA16E3"
                    textColor="white"
                    actionDelegate={SubmitReport}
                />

            </Box>
            </Box>
        </React.Fragment>
    );
};

export default FormSubmitReport;