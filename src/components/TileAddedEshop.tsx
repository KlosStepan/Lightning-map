import React from 'react';
import { Card, CardMedia, Container, Box, Typography } from '@mui/material';

const containerOuterStyle = {
    //padding: '16px 12px',
    //gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
    //margin: '0px 0px 10px 0px',
    //height: '500px', // Adjust height as needed
};

const imageStyle = {
    height: '50%',
};

type TileAddedEshopProps = {
    //id: string;
    image: string;
    likes: string;
    title: string;
    desc: string;
}

const TileAddedEshop: React.FC<TileAddedEshopProps> = ({ image, likes, title, desc }) => {
    return (
        <Container /*maxWidth="sm"*/ sx={containerOuterStyle} disableGutters>
            {/*<Card sx={{ height: '100%' }}>*/}
            <CardMedia
                component="img"
                image="https://upload.wikimedia.org/wikipedia/commons/f/f6/Alza_logo.png" // Replace with your image URL
                alt={title}
                sx={imageStyle}
            />
            {/*<Box sx={{ padding: '16px' }}>*/}
            <Typography variant="body2" color="text.secondary">
                {likes}
            </Typography>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {desc}
            </Typography>
            <div>|EDIT| &nbsp; |DELETE|</div>
            {/*</Box>*/}
            {/*</Card>*/}
        </Container>
    );
}

export default TileAddedEshop;
