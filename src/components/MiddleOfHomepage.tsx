import React from "react";
import { Grid, Typography, CardMedia, Box } from "@mui/material";

// Importing images
import img1_magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel.png';
import imgs2Overlap1 from '../img/rectangle_145.png'; // Image 145
import imgs2Overlap2 from '../img/rectangle_147.png'; // Image 147
import img3Comeback from '../img/Hand-Love--Streamline-Pixel.png';

// Define the common height
const COMMON_HEIGHT = '450px';

type MiddleOfHomepageProps = {};

const MiddleOfHomepage: React.FC<MiddleOfHomepageProps> = () => {
  return (
    <React.Fragment>
      {/* Wrapper with min height of 450px */}
      <Box sx={{ minHeight: COMMON_HEIGHT, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* First 1 unit */}
          <Grid item xs={1}>
            <div
              style={{
                position: "relative",
                height: COMMON_HEIGHT,
              }}
            >
              <CardMedia
                component="img"
                image={img1_magnet}
                alt="Magnet Image"
                style={{
                  width: '90px', // 77% of 90px
                  height: '90px', // 77% of 90px
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  objectFit: 'cover',
                }}
              />
            </div>
          </Grid>

          {/* First x/2 units */}
          <Grid item xs={5}>
            <div style={{ position: "relative", height: COMMON_HEIGHT }}>
              {/* Image 145 (imgs2Overlap1) scaled to 77% of original size */}
              <CardMedia
                component="img"
                image={imgs2Overlap1}
                alt="Image 145"
                style={{
                  width: '242px', // 77% of 315px
                  height: '385px', // 77% of 500px
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  objectFit: 'cover',
                  zIndex: 2, // Ensures this image is on top of the other where they overlap
                }}
              />
              {/* Image 147 (imgs2Overlap2) scaled to 77% of original size */}
              <CardMedia
                component="img"
                image={imgs2Overlap2}
                alt="Image 147"
                style={{
                  width: '199px', // 77% of 259px
                  height: '308px', // 77% of 400px
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  objectFit: 'cover',
                  zIndex: 1, // This will be under Image 145 in overlapping areas
                }}
              />
            </div>
          </Grid>

          {/* Second x/2 units */}
          <Grid item xs={5}>
            <div style={{ /*backgroundColor: "#90caf9", height: "100px"*/ }}>
            <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem' }}>
                Experience instant<br />
                payments like<br />
                never before
            </Typography>
            </div>
          </Grid>

          {/* Last 1 unit */}
          <Grid item xs={1}>
            <div
              style={{
                position: "relative",
                height: COMMON_HEIGHT,
              }}
            >
              <CardMedia
                component="img"
                image={img3Comeback}
                alt="Comeback Image"
                style={{
                  width: '90px', // 77% of 90px
                  height: '90px', // 77% of 90px
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  objectFit: 'cover',
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default MiddleOfHomepage;
