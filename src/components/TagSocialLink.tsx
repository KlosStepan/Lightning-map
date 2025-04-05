import React from "react";
//MUI
import { Box } from "@mui/material";
//TypeScript
import ISocial from "../ts/ISocial";

// Style for the social link tag
const styleTagSocialLink = {
    fontFamily: 'PixGamer',
    display: 'inline-block',
    backgroundColor: '#F0F0F0',
    color: '#000000',
    padding: '4px 12px',
    margin: '0px 2px',
    borderRadius: '100px',
    fontSize: '22px',
    textAlign: 'center',
    textDecoration: 'none', // Remove underline from link
    transition: 'background-color 0.7s ease',
    '&:hover': {
        backgroundColor: (theme: any) => theme.palette.grey[500],
    },
};

type TagSocialLinkProps = {
    social: ISocial;
    scale?: number; // Optional scale prop
};

const TagSocialLink: React.FC<TagSocialLinkProps> = ({ social, scale = 1 }) => {
    if (!social.link) {
        return <></>; // If no link exists, render nothing
    }

    return (
        <a href={social.link} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
            <Box sx={{ ...styleTagSocialLink, transform: `scale(${scale})`, transformOrigin: 'center' }}>
                <span id={social.label}>{social.label}</span>
            </Box>
        </a>
    );
};

export default TagSocialLink;
