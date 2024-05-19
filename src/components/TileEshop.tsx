import React from "react";
import Box from '@mui/material/Box';
import { Card, CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
//
import warningbox from '../img/warning-box.png'

const containerOuterStyle = {
    //width: '315px',
    //height: '478px',
    //padding: '32px 0px 10px 0px',
    padding: '20px 16px 20px 16px',
    gap: '10px',
    //borderRadius: '24px 24px 24px 24px',
    borderRadius: '16px',
    opacity: '0px',
    backgroundColor: 'white', // Adding background color
    margin: '0px 0px 10px 0px',
};

const containerInnerStyle = {
    gap: '20px',
    opacity: '0px',
};

type TileEshopProps = {
    likes: string;
    logo: string;
    title: string;
    caption: string;
}

const TileEshop: React.FC<TileEshopProps> = ({ likes, logo, title, caption }) => {
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ bgcolor: '#ffffff', ...containerInnerStyle }}>
                    <div>
                        <CardMedia
                            component="img"
                            //width="4"
                            //height="4"
                            image={warningbox}
                            alt="report"
                        />
                        &nbsp;
                        {likes}</div>
                    {/*<div><u>|A alza.cz|</u></div>*/}
                    <CardMedia
                        component="img"
                        //width="164"
                        height="100"
                        image={logo}
                        alt={title}
                    />
                    <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                        {title}
                    </Typography>
                    <p style={{ textAlign: 'left', fontSize: '12px' }}>{caption}</p>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default TileEshop;