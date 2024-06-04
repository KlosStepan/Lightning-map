import React from "react";
import { Grid, Box } from '@mui/material';

type TileAddedSpotProps = {

}

const TileAddedSpot: React.FC<TileAddedSpotProps> = ({ }) => {
    return (
        <React.Fragment>
            <Box sx={{ border: '1px solid #ddd', padding: 2, height: '100%' }}>
                {/* First tile content */}
                TileAddedSpot
            </Box>
        </React.Fragment>
    )
}
export default TileAddedSpot;