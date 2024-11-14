// src/forms/formStyles.ts
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

// Define style for the container Box component
export const modalContainerStyle: SxProps<Theme> = {
    borderRadius: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    backgroundColor: '#F0F0F0',
    padding: '16px',
};

// Define style for the Typography component
export const modalTitleStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

// Define style for the close icon
export const closeIconStyle: SxProps<Theme> = {
    width: 18,
    height: 18,
    cursor: 'pointer',
    opacity: 1,
};
