import React from "react";
//Components
import TileBlogpost from '../components/TileBlogpost';
import Footer from "../components/Footer";
//MUI
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

//images
import dummyImg from '../img/dummy512x288.png';

type BlogProps = {
    //
};

const Blog: React.FC<BlogProps> = () => {
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
    );
};

export default Blog;