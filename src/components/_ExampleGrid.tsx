import React from "react";
import { Grid, Box } from "@mui/material";

const ExampleGrid: React.FC = () => {
  const items = Array.from({ length: 18 }, (_, index) => `Item ${index }`);

  const dynamicPadding = (index: number) => {
    const spaceBetween = 8; // Hardcoded padding value
    const spaceTile = 8;
    switch (index % 6) {
      case 0:
        return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px 0px !important` }; // Left tile
      case 5:
        return { padding: `${spaceBetween}px 0px ${spaceBetween}px ${spaceTile}px !important` }; // Right tile
      default:
        return { padding: `${spaceBetween}px ${spaceTile}px ${spaceBetween}px ${spaceTile}px !important` }; // Middle tile
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ marginRight: 0, marginLeft: 0 }} // Ensure no margins on the container
    >
      {items.map((item, index) => (
        <Grid
          //item
          xs={12}
          sm={2}
          key={index}
          sx={{
            ...dynamicPadding(index), // Apply dynamic margins based on index
          }}
        >
          <Box sx={{ backgroundColor: "lightgray", padding: 2 }}>{item}</Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExampleGrid;
