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
    textDecoration: 'none', // Remove underline from link
    //transition: 'background-color 0.2s', // Smooth transition for hover
    transition: 'background-color 0.7s ease',
    '&:hover': {
        backgroundColor: (theme: any) => theme.palette.grey[500],
    },
};

type TagSocialLinkProps = {
    social: ISocial
};

const TagSocialLink: React.FC<TagSocialLinkProps> = ({ social }) => {
    return (
        <a href={social.link} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            <Box sx={styleTagSocialLink}>
                <span id={social.label}>{social.label}</span>
            </Box>
        </a>
    );
};

export default TagSocialLink;
