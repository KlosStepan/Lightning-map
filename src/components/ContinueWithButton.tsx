import React from 'react';
// MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// 1x icon
import LoginArrowRight from '../img/login-arrow-right.png';

type ContinueWithButtonProps = {
    icon: string;
    title: string;
    actionDelegate?: () =>  void | Promise<void>;
    disabled?: boolean;
}

const ContinueWithButton: React.FC<ContinueWithButtonProps> = ({
    icon,
    title,
    actionDelegate,
    disabled = false,
}) => {
return (
        <Button
            color="primary"
            onClick={actionDelegate}
            disabled={disabled}
            sx={{
                textTransform: "none",
                backgroundColor: 'white',
                borderRadius: '20px',
                width: '100%',
                padding: '4px',
                marginTop: '4px',
                marginBottom: '4px',
                filter: disabled ? 'grayscale(1)' : 'none',
                pointerEvents: disabled ? 'none' : 'auto',
                '&:hover': {
                    backgroundColor: disabled ? 'white' : undefined,
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: disabled ? 0.7 : 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
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
                        filter: disabled ? 'grayscale(1)' : 'none',
                    }}
                />
                {/* Center: Text */}
                <Box
                    component="span"
                    sx={{
                        textAlign: 'left',
                        flexGrow: 1,
                        fontSize: '20px',
                        color: disabled ? '#888' : 'inherit',
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
                        filter: disabled ? 'grayscale(1)' : 'none',
                    }}
                />
            </Box>
        </Button>
    );
};

export default ContinueWithButton;
