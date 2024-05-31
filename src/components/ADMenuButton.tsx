import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type ADMenuButtonProps = {
    icon: string;
    title: string;
    path: string;
}

const ADMenuButton: React.FC<ADMenuButtonProps> = ({ icon, title, path }) => {
    return (
        <React.Fragment>
            {/*<Link wrapper*/}
            <Button
                color="primary"
                //onClick={actionDelegate} // Use actionDelegate as onClick handler
                sx={{
                    //backgroundColor: 'white',
                    borderRadius: '12px',
                    width: '100%',
                    padding: '4px',
                    marginTop: '12px',
                    marginBottom: '12px',
                    '&:hover': {
                        // Optional: change color on hover
                        backgroundColor: 'white',

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
                        {title}
                    </Box>
                </Box>
            </Button>
            {/*</Link wrapper*/}
        </React.Fragment>
    )
}

export default ADMenuButton;