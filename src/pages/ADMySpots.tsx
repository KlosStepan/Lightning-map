import React from "react";
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import Button from '@mui/material/Button';

import ADMenu from "../components/ADMenu";
import TileAddedSpot from "../components/TileAddedSpot";

import FotoBluePig from '../img/foto-blue-pig.png';
import FotoPolis from '../img/foto-polis.png';

function ADMySpots() {
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
                                    Added spots
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent="flex-end">
                                <Button variant="contained" color="primary">
                                    + Add spot
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                                    {/* First tile content */}
                                    <TileAddedSpot
                                        likes="12"
                                        image={FotoPolis}
                                        tags={['Food&Drinks', 'Services']}
                                        title="Paralelní Polis"
                                        address="475/43, Dělnická, 170 00 Praha 7"
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
                                    <TileAddedSpot
                                        likes="7"
                                        image={FotoBluePig}
                                        tags={['Food&Drinks', 'Services', 'Idk']}
                                        title="Blue Vegal Pig Shop"
                                        address="Francouzská 420/76, 101 00 Praha 10-Vinohrady"
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
export default ADMySpots;