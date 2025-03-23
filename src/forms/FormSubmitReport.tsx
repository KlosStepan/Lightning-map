import React, { useRef } from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
//MUI
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
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
    const reportRef = useRef<HTMLInputElement>(null);

    const SubmitReport = async () => {
        const pack: IReport = {vendorid:"asd", userid:"asd", timestamp:"timetamp", report: reportRef.current?.value}
        console.log("Pack: ", pack)
        console.log("Submitting a report")
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
                        color="#8000FF" 
                        textColor="white" 
                        actionDelegate={closeModal} 
                    />
                )}
                <ButtonUniversal
                    title="Submit"
                    color="#F23CFF"
                    textColor="white"
                    actionDelegate={SubmitReport}
                />

            </Box>
            </Box>
        </React.Fragment>
    );
};

export default FormSubmitReport;