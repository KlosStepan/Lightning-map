import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const linkStyle = {
    color: "inherit",
    textDecoration: "inherit",
    fontSize: '18px',
};

const buttonStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '100%',
    padding: '4px 14px', // Top/Bottom 4px, Left/Right 14px
    margin: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        // Optional: change color on hover
    },
};

const boxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
};

const iconStyle = {
    width: 24,
    height: 24,
    marginRight: 2,
};

const titleStyle = {
    textAlign: 'center',
    flexGrow: 1,
};

type ADMenuButtonProps = {
    icon: string;
    title: string;
    path: string;
};

const ADMenuButton: React.FC<ADMenuButtonProps> = ({ icon, title, path }) => {
    return (
        <React.Fragment>
            <Link style={linkStyle} to={path}>
                <Button color="primary" sx={buttonStyle}>
                    <Box sx={boxContainerStyle}>
                        <Box component="img" src={icon} alt={title} sx={iconStyle} />
                        <Box component="span" sx={titleStyle}>
                            {title}
                        </Box>
                    </Box>
                </Button>
            </Link>
        </React.Fragment>
    );
};

export default ADMenuButton;
