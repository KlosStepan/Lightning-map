import React, { useRef, useState } from "react";
// Components
import AvatarCircle from "../components/AvatarCircle";
import ButtonUniversal from "../components/ButtonUniversal";
import Footer from "../components/Footer";
// enums
import { ButtonColor, ButtonLayout, ButtonSide } from "../enums";
// MUI
import { Box, Grid, CssBaseline, Typography, TextField } from "@mui/material";
// Router
import { useNavigate } from "react-router-dom";
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";

// Icons
import mapWorldImage from "../img/map-world.jpg";
import ArrowRight from "../img/arrow-right.png";

type SignUpProps = {
  // 
};

const avatarList = [1,2,3,4,5,6,7,8,9,10,11,12,13];

const SignUp: React.FC<SignUpProps> = ({}) => {
  const navigate = useNavigate();
  //
  const DEBUG = useSelector((state: RootState) => state.misc.debug);
  // Profile info
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<number>(0);

  // Debug Function - Populate Fields
  const DebugPopulateDummyUser = () => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    if (firstNameRef.current) firstNameRef.current.value = `Name-${randomNumber}`;
    if (lastNameRef.current) lastNameRef.current.value = `Surname-${randomNumber}`;
    if (emailRef.current) emailRef.current.value = `email${randomNumber}@example.com`;
    setAvatar(avatarList[Math.floor(Math.random() * avatarList.length)]); // <-- random avatar
  };

  const ClearFields = () => {
    if (firstNameRef.current) firstNameRef.current.value = "";
    if (lastNameRef.current) lastNameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    setAvatar(0);
  };

  const handleSignUp = async () => {
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const avatar = Math.floor(Math.random() * 12) + 1;

    if (!firstName || !lastName || !email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const registerResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, avatar }),
        credentials: "include"
      });
      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        alert(registerData.message || "Registration failed");
        return;
      }

      alert("Account created! Please check your email for your password.");
      navigate("/login");
    } catch (error) {
      console.error("[SignUp] handleSignUp failed:", error);
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
            <span style={{ paddingTop: "24px" }} />
            <Typography variant="h3" component="h2">
              Choose your avatar
            </Typography>
            <Box
              component="form"
              onSubmit={async (e: React.FormEvent) => {
                e.preventDefault();
                await handleSignUp();
              }}
              noValidate
              sx={{ mt: 1/*, width: "100%"*/ }}
            >
            <Box
              mt={1}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "left",
                maxWidth: 350, // <-- Match input field width
                width: "100%",
                margin: "0 auto", // Center horizontally
              }}
            >
              {avatarList.map((avNum) => (
                <AvatarCircle
                  key={avNum}
                  n={avNum}
                  fnct={setAvatar}
                  selected={avatar === avNum}
                />
              ))}
            </Box>
            <div style={{ paddingTop: "12px" }} />
              <Box mt={1}>
                <TextField
                  fullWidth
                  inputRef={firstNameRef}
                  placeholder="First name"
                  autoComplete="given-name"
                  required
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box mt={1}>
                <TextField
                  fullWidth
                  inputRef={lastNameRef}
                  placeholder="Last name"
                  autoComplete="family-name"
                  required
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box mt={1}>
                <TextField
                  fullWidth
                  inputRef={emailRef}
                  type="email"
                  placeholder="E-mail"
                  autoComplete="email"
                  required
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box mt={2} width="100%">
                <ButtonUniversal
                  icon={ArrowRight}
                  side={ButtonSide.Right}
                  title={"Create Account"}
                  color={ButtonColor.Pink}
                  hoverColor={ButtonColor.PinkHover}
                  textColor="white"
                  type="submit"
                  fullWidth={true}
                  layout={ButtonLayout.Expand}
                />
              </Box>
              <div style={{ paddingTop: "12px" }} ></div>
              <div style={{ fontFamily: "PixGamer", fontSize: "20px", textAlign: "center" }}>
                <span>
                  Already have an account?{" "}
                  <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                    <u>Log in</u>
                  </span>
                </span>
              </div>
            </Box>
            {DEBUG && (
              <Box mt={2} display="flex" flexDirection="row" justifyContent="center" width="100%" gap={2}>
                <ButtonUniversal
                  title="^ Debug Dummy User"
                  color={ButtonColor.Purple}
                  hoverColor={ButtonColor.PurpleHover}
                  textColor="white"
                  actionDelegate={DebugPopulateDummyUser}
                />
                <ButtonUniversal
                  title="Clear"
                  color={ButtonColor.Purple}
                  hoverColor={ButtonColor.PurpleHover}
                  textColor="white"
                  actionDelegate={ClearFields}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default SignUp;