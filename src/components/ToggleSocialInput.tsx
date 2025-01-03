import React from 'react';
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
    const isOpen = social.link !== null;
    //
    return (
        <React.Fragment>
            { isOpen ? (
                <React.Fragment>
                    <Typography variant="h3" component="h5" fontFamily="PixGamer">
                        {capitalizeFirst(social.network)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:'4px' }}>
                        <TextField
                            fullWidth
                            defaultValue={isOpen ? social.link : ""}
                            onBlur={(event) => {
                                const newLink = event.target.value.trim();
                                console.log(newLink);
                                switchLinkTo(newLink || null);
                            }}
                            sx={{ flex: 1 }}
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
                                    marginLeft: '8px',
                                }}
                            />
                        </span>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div style={{fontFamily: 'PixGamer', fontSize: '22px'}}>
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
