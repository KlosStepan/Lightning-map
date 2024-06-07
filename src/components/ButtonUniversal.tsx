import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type ButtonUniversalProps = {
    icon?: string;
    side?: 'L' | 'R';
    title: string;
    color: string;
    textColor: string;
    actionDelegate?: () => Promise<void>;
}
const ButtonUniversal: React.FC<ButtonUniversalProps> = ({ icon, side, title, color, textColor, actionDelegate }) => {
    return (
        <Button
            color="primary"
            onClick={actionDelegate} // Use actionDelegate as onClick handler
            sx={{
                backgroundColor: color,
                borderRadius: '20px',
                //width: '100%',
                padding: '4px',
                //marginTop: '12px',
                //marginBottom: '12px',
                marginLeft: '4px',
                marginRight: '4px',
                '&:hover': {
                    // Optional: change color on hover
                },
                //display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //width: '100%',
                }}
            >
                {side === 'L' && icon && (
                    <Box
                        component="img"
                        src={icon}
                        alt={title}
                        sx={{
                            width: 24,
                            height: 24,
                            marginLeft: 1,
                        }}
                    />
                )}
                <Box
                    component="span"
                    sx={{
                        textAlign: 'center',
                        color: textColor,
                        fontSize: '16px',
                        marginLeft: 1,
                        marginRight: 1,
                    }}
                >
                    {title}
                </Box>
                {side === 'R' && icon && (
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
                )}
            </Box>
        </Button>
    )
}
export default ButtonUniversal;