import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModifFormSpot from "./ModifFormSpot";
//
import closeIcon from '../icons/close.png';
//
const iconStyle = {
    width: 18, // Adjust icon size as needed
    height: 18,
};

type FormAddSpotProps = {
    closeModal: () => void;  // Add this prop
}

const FormAddSpot: React.FC<FormAddSpotProps> = ({ closeModal }) => {
    //Send stuff in here
    return (
        <React.Fragment>
            <Box
              style={{
                borderRadius: '20px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 450,
                backgroundColor: 'white',
                padding: '16px',
              }}
            >
            <Typography id="modal-modal-title" variant="h1" component="h2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                New spot
                <span
                    onClick={closeModal} // Use closeModal here
                >
                    <Box
                        component="img"
                        src={closeIcon}
                        alt="Custom Search Icon"
                        sx={iconStyle}
                        style={{
                            cursor: 'pointer',    // Shows pointer cursor on hover
                            //transition: 'opacity 0.3s ease', // Smooth transition effect for hover
                            opacity: 1,
                        }}
                    />
                </span>
            </Typography>
            <ModifFormSpot FuncCancel={closeModal}/>
            </Box>
        </React.Fragment>
    )
}
export default FormAddSpot;