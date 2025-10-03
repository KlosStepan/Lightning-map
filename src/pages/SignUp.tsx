import React, { useRef } from "react";
import Footer from "../components/Footer";
import ButtonUniversal from "../components/ButtonUniversal";
import { ButtonColor } from "../enums";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  CssBaseline,
  Typography,
  TextField,
} from "@mui/material";
import mapWorldImage from "../img/map-world.jpg";

type SignUpProps = {
  // Add props here if needed in the future
};

const SignUp: React.FC<SignUpProps> = ({}) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

const handleSignUp = async () => {
  const firstName = firstNameRef.current?.value || "";
  const lastName = lastNameRef.current?.value || "";
  const email = emailRef.current?.value || "";
  const password = passwordRef.current?.value || "";

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Register the user
    const registerResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      alert(registerData.message || "Registration failed");
      return;
    }

    // Login the user to get the token
    const loginResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const loginData = await loginResponse.json();

    if (loginResponse.ok && loginData.token) {
      //localStorage.setItem("jwt_token", loginData.token);
      console.log("Token", loginData.token);
      navigate("/admin/dashboard");
    } else {
      alert(loginData.message || "Login after registration failed");
    }
  } catch (error) {
    alert("Network error");
  }
};

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
            <Typography variant="h1" component="h1">
              Create Account
            </Typography>
            <div>&nbsp;</div>
            <Box
              component="form"
              onSubmit={async (e: React.FormEvent) => {
                e.preventDefault();
                await handleSignUp();
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box mt={2}>
                <Typography variant="h2" component="h5">
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  inputRef={firstNameRef}
                  //placeholder="First name"
                />
              </Box>
              <Box mt={2}>
                <Typography variant="h2" component="h5">
                  Last Name
                </Typography>
                <TextField
                  fullWidth
                  inputRef={lastNameRef}
                  //placeholder="Last name"
                />
              </Box>
              <Box mt={2}>
                <Typography variant="h2" component="h5">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  inputRef={emailRef}
                  //placeholder="Email"
                />
              </Box>
              <Box mt={2}>
                <Typography variant="h2" component="h5">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  inputRef={passwordRef}
                  //placeholder="Password"
                  type="password"
                />
              </Box>
              <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                <ButtonUniversal
                  title="Create Account"
                  color={ButtonColor.Pink}
                  hoverColor={ButtonColor.PinkHover}
                  textColor="white"
                  actionDelegate={handleSignUp}
                />
              </Box>
              <Box mt={2} width="100%" display="flex" justifyContent="center" textAlign="center">
                <span>
                  Already have an account?{" "}
                  <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                    <u>Log in</u>
                  </span>
                </span>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default SignUp;