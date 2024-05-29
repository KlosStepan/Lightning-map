import React from 'react';
import Button from '@mui/material/Button';

type ContinueWithButtonProps = {
    icon: string;
    title: string;
    miscDelegate?: string;
}

const ContinueWithButton: React.FC<ContinueWithButtonProps> = ({ icon, title, miscDelegate }) => {
    return (
        <Button
            color="primary"
            sx={{
                backgroundColor: 'white',
                borderRadius: '20px', // Adjust the value to make the corners more or less rounded
                width: '100%', // Make the button fill the horizontal space
                padding: '4px', // Add padding
                //borderTop: '12px !important', // Add top border
                //borderBottom: '12px !important', // Add bottom border
                marginTop: '12px',
                marginBotton: '12px',
                '&:hover': {
                    //backgroundColor: 'lightgray' // Optional: change color on hover
                }
            }}
        >
            `{icon}` Continue with {title} <span style={{ display: "none" }}>({miscDelegate})</span> -&gt;
        </Button>
    )
}

export default ContinueWithButton;
