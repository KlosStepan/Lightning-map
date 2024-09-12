import React from "react";
import Footer from "../components/Footer";
import { Card, CardMedia, Grid } from '@mui/material';
import TileBlogpost from '../components/TileBlogpost';
import Typography from '@mui/material/Typography';

import dummyImg from '../img/dummy512x288.png';

type BlogProps = {

};

const Blog: React.FC<BlogProps> = ({ }) => {
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1">
                Blog
            </Typography >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="How Bitcoin Lightning Revolutionizes Transaction Times"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="Exploring the Growing Ecosystem of Lightning-Enabled Businesses"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="The Role of Bitcoin Lightning in Financial Inclusion"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="How Bitcoin Lightning Revolutionizes Transaction Times"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="Exploring the Growing Ecosystem of Lightning-Enabled Businesses"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="The Role of Bitcoin Lightning in Financial Inclusion"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TileBlogpost
                        title="How Bitcoin Lightning Revolutionizes Transaction Times"
                        date="Jan 8, 2024"
                        image={dummyImg}
                    />
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    )
}
export default Blog;