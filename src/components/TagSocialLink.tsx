import React from "react";
import { Box } from "@mui/material";

const styleTagSocialLink = {
    fontFamily: 'PixGamer',
    display: 'inline-block',
    backgroundColor: '#F0F0F0',
    color: '#000000',
    padding: '4px 12px',
    margin: '0px 2px',
    borderRadius: '16px',
    fontSize: '18px',
    textAlign: 'center',
};

type TagSocialLinkProps = {
    social: string;
    link: string;
};

const TagSocialLink: React.FC<TagSocialLinkProps> = ({ social, link }) => {
    return (
        <Box sx={{ ...styleTagSocialLink }}>
            {social}
        </Box>
    );
};

export default TagSocialLink;
