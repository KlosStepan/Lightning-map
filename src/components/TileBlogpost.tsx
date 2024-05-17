import React from 'react';
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
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Avatar alt="Blog Image" src={image} style={{ width: '100px', height: '100px', margin: 'auto' }} />
            <Typography variant="h2" gutterBottom>{title}</Typography>
            <Typography variant="h3" gutterBottom>{date}</Typography>
        </Paper>
    );
};

export default TileBlogpost;
