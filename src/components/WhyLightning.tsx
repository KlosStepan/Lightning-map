import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import TileExplainer from './TileExplainer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import transactionspeed from '../img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from '../img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import privacyanddecentralization from '../img/Interface-Essential-Lock--Streamline-Pixel.png';

const WhyLightning = () => {
  const desktopCarouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Default for desktop
    slidesToScroll: 1,
    arrows: false,
  };

  const mobileCarouselSettings = {
    ...desktopCarouselSettings,
    slidesToShow: 1.2, // Show part of the next slide on mobile
  };

  const tiles = [
    {
      image: transactionspeed,
      title: "Transaction Speed",
      paragraph: "Bitcoin Lightning enables instant microtransactions off the main Bitcoin blockchain. This means users can make payments practically instantly, which is much faster than traditional blockchain transactions that can take several minutes to hours.",
    },
    {
      image: lowfees,
      title: "Low Fees",
      paragraph: "Transaction fees with Bitcoin Lightning are typically much lower than with traditional on-chain transactions. This means that even when conducting frequent and small transactions, you can save on fees.",
    },
    {
      image: privacyanddecentralization,
      title: "Privacy and Decentralization",
      paragraph: "Bitcoin Lightning enhances privacy and decentralization by allowing users to make more anonymous payments off the main blockchain. This boosts security and trust while reducing reliance on central authorities, making it more resistant to censorship and manipulation.",
    },
  ];

  return (
    <Grid container spacing={2}>
      {/* Desktop: "Why Lightning?" and Tiles */}
      <Grid
        item
        container
        xs={12}
        spacing={2}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {/* "Why Lightning?" as the first box */}
        <Grid item xs={3}>
            <Typography variant="h1" component="h2">
                Why Lightning?
            </Typography>
        </Grid>

        {/* Tiles */}
        {tiles.map(({ image, title, paragraph }, index) => (
          <Grid item xs={3} key={index}>
            <TileExplainer image={image} title={title} paragraph={paragraph} />
          </Grid>
        ))}
      </Grid>

      {/* Mobile: "Why Lightning?" Heading + Carousel */}
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        {/* "Why Lightning?" Heading */}
        <Box sx={{ textAlign: 'center'/*, backgroundColor: '#f5f5f5'*/, py: 4 }}>
          <Typography variant="h1" component="h2">Why Lightning?</Typography>
        </Box>

        {/* Carousel */}
        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Slider {...mobileCarouselSettings}>
            {tiles.map(({ image, title, paragraph }, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <TileExplainer image={image} title={title} paragraph={paragraph} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WhyLightning;
