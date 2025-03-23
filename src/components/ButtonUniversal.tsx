import React from 'react';
//enums
import { ButtonSide } from '../enums';
//MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const buttonStyles = {
    backgroundColor: (color: string) => color,
    borderRadius: '20px',
    padding: '4px 6px',  // Top/Bottom 4px, Left/Right 6px
    margin: '2px 2px',  // Top/Bottom 4px, Left/Right 2px
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.7s ease',
    '&:hover': {
        backgroundColor: (theme: any) => theme.palette.grey[700],
    },
};

const boxContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

//Might not be needed to be 24x24, so commenting out for 16.5 x 24 icon
const iconStyles = {
    //width: 24,
    //height: 24,
    marginLeft: 1,
};

const textStyles = {
    textAlign: 'center',
    fontSize: '16px',
    marginLeft: 1,
    marginRight: 1,
};

type ButtonUniversalProps = {
    icon?: string;
    side?: ButtonSide
    title: string;
    color: string;
    textColor: string;
    actionDelegate?: () => Promise<void> | void;
    fullWidth?: boolean
};

const ButtonUniversal: React.FC<ButtonUniversalProps> = ({ icon, side, title, color, textColor, actionDelegate, fullWidth=false }) => {
    return (
        <Button
            color="primary"
            onClick={actionDelegate}
            sx={{ ...buttonStyles, backgroundColor: color }}
            fullWidth={fullWidth}
        >
            <Box sx={{ ...boxContainerStyles }}>
                { side === 'L' && icon && (
                    <Box
                        component="img"
                        src={icon}
                        alt={title}
                        sx={{ ...iconStyles }}
                    />
                )}
                <Box component="span" sx={{ ...textStyles, color: textColor }}>
                    {title}
                </Box>
                { side === 'R' && icon && (
                    <Box
                        component="img"
                        src={icon}
                        alt={title}
                        sx={{ ...iconStyles }}
                    />
                )}
            </Box>
        </Button>
    );
};

export default ButtonUniversal;