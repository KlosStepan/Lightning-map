import React from "react";
//MUI
import { Box } from "@mui/material";

type TagMerchantProps = {
    tag: string;
} & (
    | { edit: true; selected: boolean; actionDelegate: (adding: boolean, tag: string) => Promise<void> | void }
    | { edit?: false; selected?: boolean; actionDelegate?: undefined }
);

const TagMerchant: React.FC<TagMerchantProps> = ({ tag, edit = false, selected = false, actionDelegate }) => {
    // Style for TagMerchant
    const tagStyle = {
        display: 'inline-block',
        backgroundColor: edit && selected ? '#999999' : '#8000FF',
        color: 'white',
        padding: '4px 10px',
        margin: '0px 4px 0px 0px',
        borderRadius: '100px',
        fontSize: '14px',
        textAlign: 'center',
        fontFamily: 'IBM Plex Sans Condensed',
        ...(edit && {
            cursor: 'pointer',
            '&:hover': {
                opacity: 0.8,
            },
        }),
    };
    const SwapTag = async () => {
        if (edit && actionDelegate) {
            actionDelegate(!selected, tag); // Toggle the tag
        }
    }
    return (
        <Box sx={tagStyle}  onClick={edit ? SwapTag : undefined}>
            {tag}
        </Box>
    );
};

export default TagMerchant;
