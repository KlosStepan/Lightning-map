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
  //width: 400,
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
type SearchFiddleProps = {

};
  
// Component
const SearchFiddle: React.FC<SearchFiddleProps> = ({ }) => {
  return (
    <Paper component="form" sx={paperStyle}>
      <InputBase
        sx={inputBaseStyle}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={iconButtonStyle} aria-label="search">
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

export default SearchFiddle;
