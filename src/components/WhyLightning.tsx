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
      title: "Pay in a second",
      paragraph: "Lightning Network payments go through in about a second, just as fast as tapping a card. No waiting at the checkout.",
    },
    {
      image: lowfees,
      title: "Fees in cents (or less)",
      paragraph: "Paying usually costs less than a cent, so even small everyday purchases make sense, for you and the shop.",
    },
    {
      image: privacyanddecentralization,
      title: "No bank in the middle",
      paragraph: "You pay the shop directly over Bitcoin's interoperable Lightning Network (layer 2). No bank, no card network, no chargebacks.",
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
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h1" component="h2">Why Lightning?</Typography>
        </Box>

        {/* Carousel */}
        <Box sx={{ maxWidth: '100%', overflow: 'hidden'}} >
          <Slider {...mobileCarouselSettings}>
            {tiles.map(({ image, title, paragraph }, index) => (
              <Box key={index} sx={{ /*px: 2*/ paddingRight: 2 }}>
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
