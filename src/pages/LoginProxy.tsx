// src/components/LoginProxy.tsx
import React from "react";
import { Grid, CssBaseline, Box } from "@mui/material";
import Footer from "../components/Footer";
import mapWorldImage from "../img/map-world.jpg";

interface LoginProxyProps {
  content: React.ReactNode;
}

const LoginProxy: React.FC<LoginProxyProps> = ({ content }) => {
  return (
    <>
      <Grid container component="main" sx={{ height: "70vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${mapWorldImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? "#f0f0f0" : "#121212",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {content}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LoginProxy;
