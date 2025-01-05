import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import TileExplainer from './TileExplainer'; // Assuming this is your component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import transactionspeed from '../img/Interface-Essential-Flash--Streamline-Pixel.png';
import lowfees from '../img/Business-Products-Cash-User-Man-Message--Streamline-Pixel.png';
import privacyanddecentralization from '../img/Interface-Essential-Lock--Streamline-Pixel.png';

const WhyLightning = () => {
  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2, // Show a part of the next slide
    slidesToScroll: 1,
    arrows: false,
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
      {/* Full-width stripe for "Why Lightning?" */}
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', backgroundColor: '#f5f5f5', py: 4 }}>
          <Typography variant="h1" component="h2">
            Why Lightning?
          </Typography>
        </Box>
      </Grid>

      {/* Desktop: Four boxes in a row */}
      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}
      >
        {tiles.map(({ image, title, paragraph }, index) => (
          <Box key={index} sx={{ flex: 1, px: 1 }}>
            <TileExplainer image={image} title={title} paragraph={paragraph} />
          </Box>
        ))}
      </Grid>

      {/* Mobile: Carousel */}
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Slider {...carouselSettings}>
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
