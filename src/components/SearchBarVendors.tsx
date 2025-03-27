import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import customIconSrc from '../icons/Interface-Essential-Search-1--Streamline-Pixel.png';

// Styles
const paperStyle = {
  p: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  height: 36,
  borderRadius: '16px',
  backgroundColor: 'white',
};

const inputBaseStyle = {
  ml: 1,
  flex: 1,
  fontFamily: 'PixGamer',
};

const iconButtonStyle = {
  p: 1,
};

const iconStyle = {
  width: 18, // Adjust icon size as needed
  height: 18,
};

// Define props type
type SearchBarVendorsProps = {
  disabled?: boolean; // Optional prop to disable the component
};

const SearchBarVendors: React.FC<SearchBarVendorsProps> = ({ disabled = false }) => {
  // Optional: Add logic to handle the search functionality when enabled
  const handleSearch = () => {
    if (!disabled) {
      console.log('Search clicked');
      // Perform the search action
    }
  };

  return (
    <Paper component="form" sx={{ ...paperStyle, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
      <InputBase
        sx={inputBaseStyle}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        disabled={disabled} // Disable input field
      />
      <IconButton
        type="button"
        sx={iconButtonStyle}
        aria-label="search"
        onClick={handleSearch}
        disabled={disabled} // Disable icon button
      >
        <Box
          component="img"
          src={customIconSrc}
          alt="Custom Search Icon"
          sx={iconStyle}
        />
      </IconButton>
    </Paper>
  );
};

export default SearchBarVendors;
