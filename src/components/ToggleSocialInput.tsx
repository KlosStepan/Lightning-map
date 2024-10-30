import React, { useState } from 'react';
import Box from '@mui/material/Box';
import circle from '../icons/circle.png';
import closeIcon from '../icons/close.png';

const iconStyle = {
    width: 18,
    height: 18,
}

type ToggleSocialInputProps = {
    //sach mat, transform ISocial
    name: string;
}

const ToggleSocialInput: React.FC<ToggleSocialInputProps> = ({ name }) => {
    const [opened, setOpened] = useState<boolean>(false);
    
    return (
        <React.Fragment>
            {opened ? (
                <React.Fragment>
                    <div>
                        {name} |FIELD| 
                        &nbsp; <span onClick={() => setOpened(false)}>
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
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div>
                        <span onClick={() => setOpened(true)}>
                            <Box
                                component="img"
                                src={circle}
                                alt="Custom Search Icon"
                                sx={iconStyle}
                                style={{
                                    cursor: 'pointer',
                                    opacity: 1,
                                }}
                                />
                        </span>
                    &nbsp; {name}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ToggleSocialInput;
