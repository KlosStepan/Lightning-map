import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import ADMenu from "../components/ADMenu";
import Button from '@mui/material/Button';

import TileAddedEshop from "../components/TileAddedEshop";

function ADMyEShops() {
    return (
        <React.Fragment>
            <Grid container>
                {/* Sidebar */}
                <Grid item xs={3}>
                    <Box
                        sx={{
                            padding: 2,
                        }}
                    >
                        <ADMenu />
                    </Box>
                </Grid>

                {/* Main Content */}
                <Grid item xs={9}>
                    <Box
                        sx={{
                            padding: 3,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="h1" component="h1">
                                    Added e-shops
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <Button variant="contained" color="primary">
                                    + Add e-shop
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* First tile content */}
                                    <TileAddedEshop
                                        //id="70"
                                        image="https://"
                                        likes="12"
                                        title="Alza"
                                        desc="Největší prodejce elektroniky v ČR."
                                    />
                                </Box>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, marginTop: 2, height: '100%' }}>
                                    {/* Second tile content */}
                                    Tile 2
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* Third tile content */}
                                    <TileAddedEshop
                                        //id="80"
                                        image="https://"
                                        likes="7"
                                        title="Alza"
                                        desc="Největší prodejce elektroniky v ČR."
                                    />
                                </Box>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, marginTop: 2, height: '100%' }}>
                                    {/* Fourth tile content */}
                                    Tile 4
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* Fifth tile content */}
                                    Tile 5
                                </Box>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, marginTop: 2, height: '100%' }}>
                                    {/* Sixth tile content */}
                                    Tile 6
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ADMyEShops;