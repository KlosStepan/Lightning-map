import React from "react";
import { Box } from "@mui/material";

type TagMerchantProps = {
    tag: string;
}

const TagMerchant: React.FC<TagMerchantProps> = ({ tag }) => {
    return (
        <Box
            sx={{
                display: 'inline-block',
                backgroundColor: '#8000FF',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                textAlign: 'center'
            }}
        >
            {tag}
        </Box>
    )
}

export default TagMerchant;
