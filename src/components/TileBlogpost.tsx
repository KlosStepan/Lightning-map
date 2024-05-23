import React from 'react';
import { Card, CardMedia, Container, Grid } from '@mui/material';

import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


type TileBlogpostProps = {
    title: string;
    date: string;
    image: string;
}


const TileBlogpost: React.FC<TileBlogpostProps> = ({ title, date, image }) => {
    return (
        <React.Fragment>
            <CardMedia
                component="img"
                //width="100"
                style={{
                    //width: '100px',
                    //margin: '24px 0' // 20px top and bottom margin, 0 left and right margin
                    borderRadius: '16px', // Rounded corners
                    filter: 'hue-rotate(270deg) saturate(1.5) brightness(0.9)', // Purple toning effect

                }}
                //height="100"
                image={image}
                alt={title}
            />
            <Typography variant="h3" component="h3">
                {title}
            </Typography>
            <Typography variant="h4" component="h4">
                {date}
            </Typography>
        </React.Fragment>
    );
};

export default TileBlogpost;
