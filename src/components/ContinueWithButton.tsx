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
            onClick={actionDelegate}
            sx={{
                textTransform: "none",
                backgroundColor: 'white',
                borderRadius: '20px',
                width: '100%',
                padding: '4px',
                marginTop: '4px',
                marginBottom: '4px',
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
                    justifyContent: 'space-between', // <-- key change
                    width: '100%',
                }}
            >
                {/* Left: Icon */}
                <Box
                    component="img"
                    src={icon}
                    alt={title}
                    sx={{
                        width: 24,
                        height: 24,
                        marginLeft: 3,
                        marginRight: 2,
                        flexShrink: 0,
                    }}
                />
                {/* Center: Text */}
                <Box
                    component="span"
                    sx={{
                        textAlign: 'left',
                        flexGrow: 1, // <-- take up remaining space
                        fontSize: '20px',
                    }}
                >
                    Continue with {title}
                </Box>
                {/* Right: Arrow */}
                <Box
                    component="img"
                    src={LoginArrowRight}
                    alt="login-button"
                    sx={{
                        width: 24,
                        height: 24,
                        marginLeft: 1,
                        marginRight: 3,
                        flexShrink: 0,
                    }}
                />
            </Box>
        </Button>
    )
}

export default ContinueWithButton;
