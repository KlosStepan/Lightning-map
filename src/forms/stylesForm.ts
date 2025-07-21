// src/forms/formStyles.ts
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

// Define style for the container Box component
export const modalContainerStyle: SxProps<Theme> = {
  borderRadius: '20px',
  width: '90vw',
  maxWidth: 450,
  maxHeight: '90vh',
  bgcolor: '#F0F0F0',
  p: 2,
  overflowY: 'auto',
  boxShadow: 24,
  position: 'relative', // Let parent control centering
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

// Define style for the Modal
export const cardStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'flex-end', // Align modal content to the bottom
    justifyContent: 'center', // Center modal content horizontally
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional backdrop color
    },
  };