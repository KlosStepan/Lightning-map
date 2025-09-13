import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import LoginProxy from "./LoginProxy";
//import { sendPasswordReset } from "../components/Firebase"; // adjust if needed
import { useNavigate } from "react-router-dom";

const LoginProxyForgotPassword: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    /*
    try {
      await sendPasswordReset(email);
      setEmailSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send password reset email. Please try again.");
    }
    */
  };

  return (
    <LoginProxy
      content={
        <>
          <Typography variant="h1" component="h1">
            Forgot Password
          </Typography>

          {emailSent ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              If an account exists with that email, a reset link has been sent.
            </Typography>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Reset Link
              </Button>
              <Button onClick={() => navigate("/login")} fullWidth>
                ← Back to Login
              </Button>
            </Box>
          )}
        </>
      }
    />
  );
};

export default LoginProxyForgotPassword;
