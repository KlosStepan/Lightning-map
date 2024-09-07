import React from 'react';
import IconLightningPurple from './IconLightningPurple';

type IconLightningNumberProps = {
    number: string;
    scale?: number; // Add scale as an optional prop
};

const IconLightningNumber: React.FC<IconLightningNumberProps> = ({ number, scale = 0.7 }) => {

    const styleIconLightningNumber = {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '16px',
        backgroundColor: '#F0F0F0',
        padding: '4px 8px',
        transform: `scale(${scale})`,
    };

    return (
        <React.Fragment>
            <div style={{ ...styleIconLightningNumber }}>
                <IconLightningPurple />
                {number}
            </div>
        </React.Fragment>
    );
};

export default IconLightningNumber;
