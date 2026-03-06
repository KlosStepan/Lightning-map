import React, { useCallback, useEffect, useRef, useState } from "react";
// Axios
import axios from "axios";
// Components
import ContinueWithButton from "../components/ContinueWithButton";
import ButtonUniversal from "../components/ButtonUniversal";
import Footer from "../components/Footer";
import Tooltip from "@mui/material/Tooltip";

// enums
import { ButtonColor, ButtonLayout, ButtonSide } from "../enums";
// MUI
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// Router
import { useNavigate } from "react-router-dom";
// SSO w/ Google
import { GoogleLogin } from "@react-oauth/google";

// Icons
import LoginGoogle from "../img/login-google.png";
import LoginEmail from "../img/login-mail.png";
import ArrowRight from "../img/arrow-right.png";
import mapWorldImage from "../img/map-world.jpg";

type LoginProps = {
  //
};

declare global {
  interface Window {
    google?: any;
  }
}

const Login: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [busy, setBusy] = useState(false);
  const [gisReady, setGisReady] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const exchangeIdTokenForCookie = useCallback(
    async (idToken: string) => {
      if (!apiBaseUrl) {
        alert("Login misconfigured: API base URL missing.");
        return;
      }

      setBusy(true);
      try {
        await axios.post(
          `${apiBaseUrl}/auth/google`,
          { token: idToken },
          { withCredentials: true }
        );

        // Optional check to make cookie issues obvious
        await axios.get(`${apiBaseUrl}/logintest`, { withCredentials: true });

        navigate("/admin/dashboard");
      } catch (err: any) {
        if (err?.response) {
          console.error("[GoogleLogin] backend error:", err.response.data);
          alert(
            "Google login failed: " +
              (err.response.data?.message || err.response.status)
          );
        } else {
          console.error("[GoogleLogin] network error:", err);
          alert("Google login failed: backend not reachable.");
        }
      } finally {
        setBusy(false);
      }
    },
    [apiBaseUrl, navigate]
  );

  // Button #1 (official widget) -> gives ID token via credentialResponse.credential
  const handleGoogleLoginOfficial = async (credentialResponse: any) => {
    const idToken: string | undefined = credentialResponse?.credential;
    if (!idToken) {
      alert("Google login failed: missing ID token");
      return;
    }
    await exchangeIdTokenForCookie(idToken);
  };

  // Button #2 (your custom button) -> uses Google Identity Services "prompt" (no DOM click hack)
  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("[Login] Missing REACT_APP_GOOGLE_CLIENT_ID");
      return;
    }

    const g = window.google?.accounts?.id;
    if (!g) {
      // GIS script not ready yet (or blocked). Official button may still work.
      return;
    }

    try {
      g.initialize({
        client_id: clientId,
        callback: async (resp: any) => {
          const idToken: string | undefined = resp?.credential;
          if (!idToken) {
            alert("Google login failed: missing ID token");
            return;
          }
          await exchangeIdTokenForCookie(idToken);
        },
        // optional:
        // auto_select: false,
        // cancel_on_tap_outside: true,
      });

      setGisReady(true);
    } catch (e) {
      console.error("[Login] GIS initialize failed:", e);
      setGisReady(false);
    }
  }, [exchangeIdTokenForCookie]);

  const startGoogleLoginCustom = async () => {
    if (busy) return;

    const g = window.google?.accounts?.id;
    if (!g) {
      alert(
        "Google login not available (GIS not loaded). Please use the official Google button below or refresh."
      );
      return;
    }

    // Triggers Google UI (One Tap / account chooser) depending on browser state.
    // This is the supported way; no querying/clicking Google's internal DOM.
    g.prompt();
  };

  // Login via Email
  const loginUsingEmail = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!apiBaseUrl) {
      alert("Login misconfigured: API base URL missing.");
      return;
    }
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`${apiBaseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        navigate("/admin/dashboard");
      } else {
        alert((data as any).message || "Login failed");
      }
    } catch (error) {
      console.error("[Login] Network error:", error);
      alert("Network error");
    } finally {
      setBusy(false);
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

        <Grid xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {!loginWithEmail ? (
              <>
                <Typography variant="h1" component="h1">
                  Login
                </Typography>
                <span style={{ paddingTop: "12px" }} />

                {/* Official Google widget (most reliable across browsers) */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    opacity: busy ? 0.7 : 1,
                    pointerEvents: busy ? "none" : "auto",
                  }}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleLoginOfficial}
                    onError={() =>
                      alert(
                        "Google sign-in failed or was cancelled. Check browser pop-up/cookie settings and try again."
                      )
                    }
                  />
                </Box>

                <span style={{ paddingTop: "12px" }} />

                {/* Your custom full-width rounded Google button (no useRef hack) */}

                <Tooltip
                  title={
    
                    <span style={{ fontSize: "0.8rem" }}>
                      Custom button - SSO with Google.
                      <br />
                      Not working properly, <b>disabled</b> now.
                    </span>
                  }
                  placement="right"
                  arrow
                >
                  <span style={{ width: "100%" }}>
                <ContinueWithButton
                  icon={LoginGoogle}
                  title="Google (custom)"
                  //disabled={busy || !gisReady}
                  disabled={true}
                  actionDelegate={startGoogleLoginCustom}
                />
                  </span>
                </Tooltip>
                <Tooltip
                  title={
                <span style={{ fontSize: "0.8rem" }}>
                      E-mail login is temporarily unavailable.
                      <br />
                      We’re currently setting up a new mailing service mechanism
                      due to AWS SES crypto restrictions.
                    </span>
                  }
                  placement="right"
                  arrow
                >
                  <span style={{ width: "100%" }}>
                    <ContinueWithButton
                      icon={LoginEmail}
                      title="e-mail"
                      disabled={true}
                      actionDelegate={async () => setLoginWithEmail(true)}
                    />
                    <span style={{ paddingTop: "12px" }} />

                    <div
                      style={{
                        fontFamily: "PixGamer",
                        fontSize: "20px",
                        color: "grey",
                        textAlign: "center",
                      }}
                    >
                      <span>
                        <u>I forgot my password</u>
                      </span>
                    </div>

                    <span style={{ paddingTop: "12px" }} />
                    <div
                      style={{
                        fontFamily: "PixGamer",
                        fontSize: "20px",
                        color: "grey",
                        textAlign: "center",
                      }}
                    >
                      <span>
                        Don't you have an account? <u>Sign up</u>
                      </span>
                    </div>
                  </span>
                </Tooltip>
              </>
            ) : (
              <>
                <Typography variant="h1" component="h1">
                  Login
                </Typography>
                <span style={{ paddingTop: "12px" }} />

                <Box
                  component="form"
                  onSubmit={async (e: React.FormEvent) => {
                    e.preventDefault();
                    await loginUsingEmail();
                  }}
                  noValidate
                  sx={{ mt: 1, width: "100%" }}
                >
                  <Box mt={1}>
                    <TextField
                      fullWidth
                      type="email"
                      name="username"
                      placeholder="E-mail"
                      autoComplete="username"
                      required
                      inputRef={emailRef}
                      disabled={busy}
                    />
                  </Box>
                  <Box mt={1}>
                    <TextField
                      fullWidth
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="off"
                      required
                      inputRef={passwordRef}
                      disabled={busy}
                    />
                  </Box>

                  <Box
                    mt={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                  >
                    <div style={{ fontFamily: "PixGamer", fontSize: "20px" }}>
                      <span
                        onClick={() => navigate("/forgot-password")}
                        style={{ cursor: "pointer" }}
                      >
                        <u>I forgot my password</u>
                      </span>
                    </div>

                    <span style={{ paddingTop: "12px" }} />
                    <Box width="100%">
                      <ButtonUniversal
                        icon={ArrowRight}
                        side={ButtonSide.Right}
                        title={busy ? "Login..." : "Login"}
                        color={ButtonColor.Pink}
                        hoverColor={ButtonColor.PinkHover}
                        textColor="white"
                        actionDelegate={loginUsingEmail}
                        type="submit"
                        fullWidth={true}
                        layout={ButtonLayout.Expand}
                        disabled={busy}
                      />
                    </Box>

                    <span style={{ paddingTop: "12px" }} />
                    <div style={{ fontFamily: "PixGamer", fontSize: "20px" }}>
                      <span>
                        Don't you have an account?{" "}
                        <span
                          onClick={async () => setLoginWithEmail(false)}
                          style={{ cursor: "pointer" }}
                        >
                          <u>Sign up</u>
                        </span>
                      </span>
                    </div>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default Login;