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
  width: 18,
  height: 18,
};

// Props
type SearchBarVendorsProps =
  | {
      disabled: true;
      searchText?: never;
      onSearch?: never;
    }
  | {
      disabled?: false;
      searchText: string;
      onSearch: (value: string) => void;
    };


const SearchBarVendors: React.FC<SearchBarVendorsProps> = ({
  disabled = false,
  searchText,
  onSearch,
}) => {
  return (
    <Paper
      component="form"
      sx={{
        ...paperStyle,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputBase
        sx={inputBaseStyle}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        disabled={disabled}
        value={searchText}
        onChange={(e) => {
          if (!disabled && onSearch) {
            onSearch(e.target.value);
          }
        }}
      />
      <IconButton type="button" sx={iconButtonStyle} disabled>
        <Box component="img" src={customIconSrc} alt="Search" sx={iconStyle} />
      </IconButton>
    </Paper>
  );
};

export default SearchBarVendors;
