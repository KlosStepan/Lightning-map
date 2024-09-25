import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const buttonStyles = {
    backgroundColor: (color: string) => color,
    borderRadius: '20px',
    padding: '4px',
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

const iconStyles = {
    width: 24,
    height: 24,
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
    side?: 'L' | 'R';
    title: string;
    color: string;
    textColor: string;
    actionDelegate?: () => Promise<void>;
};

const ButtonUniversal: React.FC<ButtonUniversalProps> = ({ icon, side, title, color, textColor, actionDelegate, }) => {
    return (
        <Button
            color="primary"
            onClick={actionDelegate}
            sx={{ ...buttonStyles, backgroundColor: color }}
        >
            <Box sx={{ ...boxContainerStyles }}>
                {side === 'L' && icon && (
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
                {side === 'R' && icon && (
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