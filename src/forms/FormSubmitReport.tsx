import React, { useRef } from "react";
// Components
import ButtonUniversal from "../components/ButtonUniversal";
// enums
import { ButtonColor } from "../enums";
// MUI
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
// Redux + RTK
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
// TypeScript
import { IMerchantTile } from "../ts/IMerchant";
//import IReport from "../ts/IReport";
import IEshop from "../ts/IEshop";

// Icons
import closeIcon from '../icons/close.png';
// Styles
import { modalContainerStyle, modalTitleStyle, closeIconStyle } from './stylesForm';

type FormSubmitReportProps = {
    closeModal?: () => void;
    tile: IMerchantTile | IEshop;
}

const FormSubmitReport: React.FC<FormSubmitReportProps> = ({ closeModal, tile }) => {
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);
    const user = useSelector((state: RootState) => state.misc.user);
    //
    const reportRef = useRef<HTMLInputElement>(null);
    //
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
                        multiline
                        minRows={3}
                        maxRows={5}
                    />
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    {closeModal && (
                        <ButtonUniversal 
                            title="Cancel" 
                            color={ButtonColor.Purple}
                            hoverColor={ButtonColor.PurpleHover}
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