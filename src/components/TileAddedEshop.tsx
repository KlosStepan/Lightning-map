import React from 'react';
import { Card, CardMedia, Container, Box, Typography } from '@mui/material';
import ButtonUniversal from "../components/ButtonUniversal";

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
    const FuncEdit = (): Promise<void> => {
        console.log("Calling Edit")
        return Promise.resolve();
    }
    const FuncDelete = (): Promise<void> => {
        console.log("Calling Delete")
        return Promise.resolve();
    }

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
            <div>
                <ButtonUniversal title="EDIT" color="#F23CFF" actionDelegate={FuncEdit} /> &nbsp;
                <ButtonUniversal title="DELETE" color="#F23CFF" actionDelegate={FuncDelete} />
            </div>
            {/*</Box>*/}
            {/*</Card>*/}
        </Container>
    );
}

export default TileAddedEshop;
