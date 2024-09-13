import React from "react";
import { Box } from "@mui/material";

// Define styles separately
const tagStyle = {
    display: 'inline-block',
    backgroundColor: '#8000FF',
    color: 'white',
    padding: '4px 8px',
    margin: '0 2px', // Add 2px margin to the left and right
    borderRadius: '12px',
    fontSize: '10px',
    textAlign: 'center',
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
