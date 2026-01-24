import React from 'react';
//enums
import { ButtonSide } from '../enums';
//MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const boxContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const iconStyles = {
    marginLeft: 1,
};

const textStyles = {
    textAlign: 'center',
    fontSize: '17px',
    marginLeft: 1,
    marginRight: 1,
};

type ButtonUniversalProps = {
    icon?: string;
    side?: ButtonSide;
    title: string;
    color: string;
    hoverColor: string;
    textColor: string;
    hoverTextColor?: string;
    actionDelegate?: () => Promise<void> | void;
    fullWidth?: boolean;
    disabled?: boolean;
    scale?: number;
    type?: "button" | "submit" | "reset"; // <-- Add this line
    tabIndex?: number; // <-- Add this 2 tabIndex
};

const ButtonUniversal: React.FC<ButtonUniversalProps> = ({
    icon,
    side,
    title,
    color,
    hoverColor,
    textColor,
    hoverTextColor,
    actionDelegate,
    fullWidth = false,
    disabled = false,
    scale = 1,
    type = "button", // <-- Default to "button"
    tabIndex, // <-- Add this 2 tabIndex
}) => {
    //const [isHovered, setIsHovered] = useState(false);
    return (
        <Box
            sx={{
                transform: `scale(${scale})`,
                display: 'inline-block',
            }}
            //onMouseEnter={() => setIsHovered(true)}
            //onMouseLeave={() => setIsHovered(false)}
        >
            <Button
                color="primary"
                onClick={actionDelegate}
                type={type} // <-- Pass type to MUI Button
                tabIndex={tabIndex} // <-- Add this 2 tabIndex
                sx={{
                    color: textColor,
                    backgroundColor: color,
                    borderRadius: '20px',
                    padding: '4px 6px',
                    margin: '2px 2px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textTransform: 'none',
                    transition: 'none',
                    '&:hover': {
                        backgroundColor: hoverColor,
                        color: hoverTextColor ?? textColor
                    },
                }}
                fullWidth={fullWidth}
                disabled={disabled}
            >
                <Box sx={{ ...boxContainerStyles }}>
                    {side === 'L' && icon && (
                        <Box
                            component="img"
                            src={icon}
                            alt={title}
                            sx={{...iconStyles}}
                        />
                    )}
                    <Box component="span" sx={{
                        ...textStyles,
                        }}
                    >
                        {title}
                    </Box>
                    {side === 'R' && icon && (
                        <Box
                            component="img"
                            src={icon}
                            alt={title}
                            sx={{...iconStyles}}
                        />
                    )}
                </Box>
            </Button>
        </Box>
    );
};

export default ButtonUniversal;
