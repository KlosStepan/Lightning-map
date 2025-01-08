import React from "react";
import { Grid, Box } from "@mui/material";

const ExampleGrid: React.FC = () => {
  const items = Array.from({ length: 9 }, (_, index) => `Item ${index }`);

  const dynamicPadding = (index: number) => {
    switch (index % 3) {
      case 0:
        return { padding: "0px 8px 0px 0px !important" }; // Left tile
      case 1:
        return { padding: "0px 4px 0px 4px !important" }; // Middle tile
      case 2:
        return { padding: "0px 0px 0px 8px !important" }; // Right tile
      default:
        return {};
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
          sm={4}
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
