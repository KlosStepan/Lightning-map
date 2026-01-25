import React, { useRef, useState } from "react";
import { Box, Grid, CssBaseline, TextField, Typography } from "@mui/material";
import Footer from "../components/Footer";
import { ButtonColor, ButtonLayout, ButtonSide } from "../enums";
import ButtonUniversal from "../components/ButtonUniversal";
import ArrowRight from "../img/arrow-right.png";
import mapWorldImage from "../img/map-world.jpg";
import { useNavigate } from "react-router-dom";

const LoginProxyForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    // TODO: Implement password reset logic here
    setEmailSent(true);
    setError(null);
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
              Password reset
            </Typography>
            <span style={{ paddingTop: "12px" }} />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1/*, width: "100%"*/ }}
            >
              <Box mt={1}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  autoComplete="email"
                  required
                  inputRef={emailRef}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              {error && (
                <Typography sx={{ color: "#888", fontSize: "14px", mt: 1, textAlign: "center" }}>
                  {error}
                </Typography>
              )}
              {emailSent && (
                <Typography sx={{ color: "#888", fontSize: "14px", mt: 1, textAlign: "center" }}>
                  If an account exists with that email, a reset link has been sent.
                </Typography>
              )}
              <Box mt={2} display="flex" flexDirection="column" alignItems="center" width="100%">
                <Box width="100%">
                  <ButtonUniversal
                    icon={ArrowRight}
                    side={ButtonSide.Right}
                    title={"Reset password"}
                    color={ButtonColor.Pink}
                    hoverColor={ButtonColor.PinkHover}
                    textColor="white"
                    type="submit"
                    fullWidth={true}
                    layout={ButtonLayout.Expand}
                  />
                </Box>
                <span style={{ paddingTop: "12px" }} />
                <div style={{ fontFamily: "PixGamer", fontSize: "20px", /*color: "#888",*/ textAlign: "center" }}>
                  <span>
                    Have you changed your password yet?{" "}
                    <span
                      onClick={() => navigate("/login")}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Log in
                    </span>
                  </span>
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default LoginProxyForgotPassword;