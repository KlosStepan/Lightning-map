import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoginArrowRight from '../img/login-arrow-right.png';
import { Link } from 'react-router-dom';

type ADMenuButtonProps = {
    icon: string;
    title: string;
    path: string;
}

const ADMenuButton: React.FC<ADMenuButtonProps> = ({ icon, title, path }) => {
    return (
        <React.Fragment>
            <Link style={{ color: "inherit", textDecoration: "inherit", fontSize: '18px' }} to={path}>
                {/*//Make Link*/}
                <Button
                    color="primary"
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        width: '100%',
                        padding: '4px',
                        marginTop: '12px',
                        marginBottom: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                            // Optional: change color on hover
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        <Box
                            component="img"
                            src={icon}
                            alt={title}
                            sx={{
                                width: 24,
                                height: 24,
                                marginRight: 2,
                            }}
                        />
                        <Box
                            component="span"
                            sx={{
                                textAlign: 'center',
                                flexGrow: 1,
                            }}
                        >
                            {title}
                        </Box>
                    </Box>
                </Button>
            </Link>
        </React.Fragment>
    );
}

export default ADMenuButton;
