import React from 'react';
import { Box } from '@mui/material';

import arrowMoveUpInactive from '../icons/arrow-move-up-inactive.png';
import arrowMoveDownInactive from '../icons/arrow-move-down-inactive.png'; // Corrected from active to inactive
import arrowMoveUpActive from '../icons/arrow-move-up-active.png';
import arrowMoveDownActive from '../icons/arrow-move-down-active.png';
import binDelete from '../icons/bin-delete.png';

type UplImgTileProps = {
    previewSrc: string; // URL for the image preview
    first?: boolean; // Optional, defaults to false
    last?: boolean;  // Optional, defaults to false
};

// Define the styles as objects
const uplImgTileStyle = {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: 2,
    margin: 1,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
};

const iconWrapperStyle = {
    position: 'absolute',
    top: 8,
    right: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const deleteIconWrapperStyle = {
    position: 'absolute',
    bottom: 8,
    right: 8,
};

const UplImgTile: React.FC<UplImgTileProps> = ({ previewSrc, first = false, last = false }) => {

    const handleMoveUp = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!first) {
            console.log('Move Up Clicked');
        }
        console.log(e);
    };

    const handleMoveDown = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!last) {
            console.log('Move Down Clicked');
        }
        console.log(e);
    };

    const handleDelete = (e: React.MouseEvent<HTMLImageElement>) => {
        console.log('Delete Clicked');
        console.log(e);
    };

    // Hover effect for icons (only active when not first or last)
    const handleHoverIn = (e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.filter = 'brightness(0.7)';
    };

    const handleHoverOut = (e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.filter = 'brightness(1)';
    };

    const getIconStyle = (exclude: string = '') => ({
        cursor: exclude ? 'default' : 'pointer', // Apply 'default' cursor if 'exclude' is passed, else 'pointer'
        width: 25,
        height: 25,
        transition: 'filter 0.3s ease',
    });

    return (
        <Box sx={uplImgTileStyle}>
            <img src={previewSrc} alt="Preview" style={imageStyle} />
            {/* Top-right corner icons */}
            <Box sx={iconWrapperStyle}>
                <img 
                    src={first ? arrowMoveUpInactive : arrowMoveUpActive} 
                    alt="Move Up" 
                    style={first ? getIconStyle('first'): getIconStyle()}
                    onClick={first ? undefined : handleMoveUp} 
                    onMouseEnter={first ? undefined : handleHoverIn} 
                    onMouseLeave={first ? undefined : handleHoverOut} 
                />
                <img 
                    src={last ? arrowMoveDownInactive : arrowMoveDownActive} 
                    alt="Move Down" 
                    style={last ? getIconStyle('last') : getIconStyle()}
                    onClick={last ? undefined : handleMoveDown} 
                    onMouseEnter={last ? undefined : handleHoverIn} 
                    onMouseLeave={last ? undefined : handleHoverOut} 
                />
            </Box>
            {/* Bottom-right corner icon */}
            <Box sx={deleteIconWrapperStyle}>
                <img 
                    src={binDelete} 
                    alt="Delete" 
                    style={getIconStyle()} 
                    onClick={handleDelete} 
                    onMouseEnter={handleHoverIn} 
                    onMouseLeave={handleHoverOut} 
                />
            </Box>
        </Box>
    );
};

export default UplImgTile;
