import React from "react";
import { Box } from "@mui/material";
import { ISocial } from "../ts/IMerchant";

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
    social: ISocial
};

const TagSocialLink: React.FC<TagSocialLinkProps> = ({ social }) => {
    return (
        <Box sx={{ ...styleTagSocialLink }}>
            <span id={social.label}>{social.label}</span>
        </Box>
    );
};

export default TagSocialLink;
