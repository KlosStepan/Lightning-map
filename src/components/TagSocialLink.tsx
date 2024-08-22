import React from "react";
import { Box } from "@mui/material";

type TagSocialLinkProps = {
    social: string;
    link: string;
}

const TagSocialLink: React.FC<TagSocialLinkProps> = ({ social, link }) => {
    return (
        <Box
            sx={{
                display: 'inline-block',
                backgroundColor: '#808080',
                color: 'white',
                padding: '4px 8px',
                margin: '0px 2px 0px 2px',
                borderRadius: '12px',
                fontSize: '12px',
                textAlign: 'center'
            }}
        >
            {social}
        </Box>
    )
}

export default TagSocialLink;
