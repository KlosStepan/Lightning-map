import React from 'react';

interface HrGreyCustomSeparatorProps {
    marginTop?: string | number;
    marginBottom?: string | number;
}

const HrGreyCustomSeparator: React.FC<HrGreyCustomSeparatorProps> = ({
    marginTop = '20px',
    marginBottom = '20px',
}) => {
    const separatorStyle = {
        borderTop: '1px solid #D3D3D3',
        width: '100%',
        marginTop,
        marginBottom,
    };

    return <div style={{ ...separatorStyle }} />;
};

export default HrGreyCustomSeparator;
