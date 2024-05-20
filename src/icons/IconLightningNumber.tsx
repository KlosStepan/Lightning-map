import React from 'react';
import IconLightningPurple from './IconLightningPurple';

type IconLightningNumberProps = {
    number: string;
}

const IconLightningNumber: React.FC<IconLightningNumberProps> = ({ number }) => {
    return (
        <React.Fragment>
            <div style={{ display: "inline", height: '28px', borderRadius: '16px', backgroundColor: '#F0F0F0' }}>
                <IconLightningPurple />{number}
            </div>
        </React.Fragment>
    )
}
export default IconLightningNumber;
