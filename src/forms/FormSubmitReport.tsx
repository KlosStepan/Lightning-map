import React, { useRef } from "react";
//Components
import { db } from "../components/Firebase";
import ButtonUniversal from "../components/ButtonUniversal";
//enums
import { ButtonColor } from "../enums";
//Firebase (modular imports)
//import { collection, addDoc, serverTimestamp } from "firebase/firestore";
//MUI
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
//Redux
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import IReport from "../ts/IReport";
import IEshop from "../ts/IEshop";
//Icons + Styles
import closeIcon from '../icons/close.png';
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from './stylesForm';

type FormSubmitReportProps = {
    closeModal?: () => void;
    tile: IMerchantTile | IEshop; // <- TODO documentid somehow
}

const FormSubmitReport: React.FC<FormSubmitReportProps> = ({ closeModal, tile }) => {
    //
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const user = useSelector((state: RootState) => state.misc.user);
    const DEBUG = useSelector((state: RootState) => state.misc.debug);

    const reportRef = useRef<HTMLInputElement>(null);
    /*
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
    */
    const SubmitReport = async () => {
        if (!user) {
            alert("You must be logged in to submit a report.");
            return;
        }
        try {
            const entityType = "logo" in tile ? "eshop" : "merchant";
            const reportData = {
                entityId: tile.id,
                entityType,
                owner: user.id,
                reason: reportRef.current?.value || "",
            };
            if (DEBUG) {
                console.log(`[report] ${entityType} (id=${tile.id}) by user '${user.id}' reason: "${reportData.reason}"`);
            }
            const res = await fetch(`${apiBaseUrl}/reports/cud`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(reportData),
            });
            if (!res.ok) {
                const txt = await res.text().catch(() => "");
                throw new Error(`Failed to submit report: ${res.status} ${txt}`);
            }
            if (closeModal) closeModal();
            alert("Report submitted. Thank you!");
        } catch (err) {
            alert("Error submitting report: " + ((err as Error).message || err));
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
                        hoverColor={ButtonColor.PurpleHover}
                        textColor="white"
                        actionDelegate={SubmitReport}
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default FormSubmitReport;