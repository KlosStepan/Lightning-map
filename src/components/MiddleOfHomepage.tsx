import React from "react";
import { Grid, Typography, CardMedia, Box, useMediaQuery, useTheme } from "@mui/material";

// Importing images
import img1_magnet from '../img/Interface-Essential-Magnet--Streamline-Pixel.png';
import imgs2Overlap1 from '../img/rectangle_145.png'; // Image 145
import imgs2Overlap2 from '../img/rectangle_147.png'; // Image 147
import img3Comeback from '../img/Hand-Love--Streamline-Pixel.png';

// Define the common height
const COMMON_HEIGHT = '450px';
const COMMON_HEIGHT_2 = '225px';

const MiddleOfHomepage: React.FC = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

  return (
    <React.Fragment>
      <Box sx={{ minHeight: COMMON_HEIGHT, display: 'flex', alignItems: 'center' }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={isPhone ? 'column' : 'row'}
        >
          {isPhone ? (
            <>
              {/* Row 1: First column images (img1_magnet and imgs2Overlap2) */}
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={5} sx={{ position: 'relative', top:'-40px'}}>
                  <CardMedia
                    component="img"
                    image={img1_magnet}
                    alt="Magnet Image"
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <CardMedia
                    component="img"
                    image={imgs2Overlap2}
                    alt="Image 147"
                    style={{
                      width: '199px',
                      height: '308px',
                      objectFit: 'cover',
                      //top: '100px',
                      //top: 0,
                      //left: 0,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Row 2: Second column images (imgs2Overlap1 and img3Comeback) */}
              <Grid container item xs={12} spacing={2} sx={{ position: 'relative', top:'-125px'}}>
                <Grid item xs={7}>
                  <CardMedia
                    component="img"
                    image={imgs2Overlap1}
                    alt="Image 145"
                    style={{
                      width: '242px',
                      height: '385px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={5} sx={{ position: 'relative', height: '100%' }}>
                  <div
                    style={{
                      position: 'relative',
                      height: COMMON_HEIGHT_2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img3Comeback}
                      alt="Comeback Image"
                      style={{
                        width: '90px',
                        height: '90px',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Grid>

              </Grid>

              {/* Row 3: Typography */}
              <Grid item xs={12} sx={{ position: 'relative', top:'-50px'}}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: '2.5rem', // Adjust font size for phone screens
                    textAlign: 'left',
                  }}
                >
                  Experience instant payments like never before
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              {/* Desktop Layout */}
              <Grid item xs={1}>
                <div
                  style={{
                    position: 'relative',
                    height: COMMON_HEIGHT,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img1_magnet}
                    alt="Magnet Image"
                    style={{
                      width: '90px',
                      height: '90px',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={5}>
                <div style={{ position: 'relative', height: COMMON_HEIGHT }}>
                  <CardMedia
                    component="img"
                    image={imgs2Overlap1}
                    alt="Image 145"
                    style={{
                      width: '242px',
                      height: '385px',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      objectFit: 'cover',
                      zIndex: 2,
                    }}
                  />
                  <CardMedia
                    component="img"
                    image={imgs2Overlap2}
                    alt="Image 147"
                    style={{
                      width: '199px',
                      height: '308px',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      objectFit: 'cover',
                      zIndex: 1,
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem' }}>
                  Experience instant<br />
                  payments like<br />
                  never before
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <div
                  style={{
                    position: 'relative',
                    height: COMMON_HEIGHT,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img3Comeback}
                    alt="Comeback Image"
                    style={{
                      width: '90px',
                      height: '90px',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default MiddleOfHomepage;
