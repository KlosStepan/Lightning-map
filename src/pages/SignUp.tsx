import React, { useRef } from "react";
//Components
import Footer from "../components/Footer";
//import { auth } from "../components/Firebase"; // adjust if needed
import ButtonUniversal from "../components/ButtonUniversal";
//Enums
import { ButtonColor } from "../enums";
//Firebase
//import { createUserWithEmailAndPassword } from "firebase/auth";
//Router
import { useNavigate } from "react-router-dom";
//MUI
import {
  Box,
  Grid,
  CssBaseline,
  Typography,
  TextField,
} from "@mui/material";
//Images
import mapWorldImage from "../img/map-world.jpg";

export default function SignUpSplit() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    try {
      //await createUserWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard"); // or wherever
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  /*const handleCancel = () => {
    navigate("/login");
  };*/

  return (
    <React.Fragment>
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
        <Grid item xs={12} sm={8} md={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" component="h1">
              Create Account
            </Typography>
            <div>&nbsp;</div>

            <Box mt={2} width="100%">
              <TextField
                fullWidth
                //inputRef={firstNameRef}
                placeholder="First name"
              />
            </Box>

            <Box mt={2} width="100%">
              <TextField
                fullWidth
                //inputRef={lastNameRef}
                placeholder="Last name"
              />
            </Box>

            <Box mt={2} width="100%">
              <TextField
                fullWidth
                inputRef={emailRef}
                placeholder="Email"
              />
            </Box>

            <Box mt={2} width="100%">
              <TextField
                fullWidth
                inputRef={passwordRef}
                placeholder="Password"
                type="password"
              />
            </Box>
              <Box mt={4} width="100%" display="flex" justifyContent="right">
              <ButtonUniversal
                  title="Create Account"
                  color={ButtonColor.Pink}
                  hoverColor={ButtonColor.PinkHover}
                  textColor="white"
                  actionDelegate={handleSignUp}
              />
              </Box>
              <Box mt={2} width="100%" display="flex" justifyContent="right" textAlign="right">
              <span>
                  Already have an account?{" "}
                  <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                  <u>Log in</u>
                  </span>
              </span>
              </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};
