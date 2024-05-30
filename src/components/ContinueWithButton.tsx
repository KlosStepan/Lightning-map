import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoginArrowRight from '../img/login-arrow-right.png';

type ContinueWithButtonProps = {
    icon: string;
    title: string;
    actionDelegate?: () => Promise<void>; // Update type to function
}

const ContinueWithButton: React.FC<ContinueWithButtonProps> = ({ icon, title, actionDelegate }) => {
    return (
        <Button
            color="primary"
            onClick={actionDelegate} // Use actionDelegate as onClick handler
            sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                width: '100%',
                padding: '4px',
                marginTop: '12px',
                marginBottom: '12px',
                '&:hover': {
                    // Optional: change color on hover
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Box
                    component="img"
                    src={icon}
                    alt={title}
                    sx={{
                        width: 24,
                        height: 24,
                        marginRight: 1,
                    }}
                />
                <Box
                    component="span"
                    sx={{
                        textAlign: 'center',
                        marginRight: 1,
                    }}
                >
                    Continue with {title}
                </Box>
                <Box
                    component="img"
                    src={LoginArrowRight}
                    alt="login-button"
                    sx={{
                        width: 24,
                        height: 24,
                    }}
                />
            </Box>
        </Button>
    )
}

export default ContinueWithButton;
