import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import circleplus from '../icons/circleplus.png';
import closeIcon from '../icons/close.png';
import ISocial from '../ts/ISocial';

const iconStyle = {
    width: 18,
    height: 18,
}

type ToggleSocialInputProps = {
    social: ISocial;
    switchLinkTo: (link: string | null) => void;
}

const capitalizeFirst = (str: string) => str ? str[0].toUpperCase() + str.slice(1) : '';


const ToggleSocialInput: React.FC<ToggleSocialInputProps> = ({ social, switchLinkTo }) => {
    //const [opened, setOpened] = useState<boolean>(false);
    const isOpen = social.link !== null;

    return (
        <React.Fragment>
            {isOpen ? (
                <React.Fragment>
                    <Typography variant="h3" component="h5">{capitalizeFirst(social.network)}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            defaultValue={isOpen ? social.link : ""}
                            sx={{ flex: 1 }} // Ensures the TextField takes the available space
                        />
                        <span onClick={() => switchLinkTo(null)}>
                            <Box
                                component="img"
                                src={closeIcon}
                                alt="Custom Search Icon"
                                sx={iconStyle}
                                style={{
                                    cursor: 'pointer',
                                    opacity: 1,
                                }}
                            />
                        </span>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div>
                        <span onClick={() => switchLinkTo('')}>
                            <Box
                                component="img"
                                src={circleplus}
                                alt="Custom Search Icon"
                                sx={iconStyle}
                                style={{
                                    cursor: 'pointer',
                                    opacity: 1,
                                }}
                                />
                        </span>
                    &nbsp; {capitalizeFirst(social.network)}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ToggleSocialInput;
