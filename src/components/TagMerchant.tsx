import React from "react";
import { Box } from "@mui/material";

// Define styles separately
const tagStyle = {
    display: 'inline-block',
    backgroundColor: '#8000FF',
    color: 'white',
    //padding: '4px 8px',
    padding: '4px 10px 4px 10px',
    margin: '0px 4px 0px 0px', // Right 4px
    borderRadius: '100px',
    fontSize: '14px',
    textAlign: 'center',
    fontFamily: 'IBM Plex Sans Condensed'
};

type TagMerchantProps = {
    tag: string;
};

const TagMerchant: React.FC<TagMerchantProps> = ({ tag }) => {
    return (
        <Box sx={{ ...tagStyle }}>
            {tag}
        </Box>
    );
};

export default TagMerchant;
