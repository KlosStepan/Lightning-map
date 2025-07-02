// src/pages/LoginProxyTest.tsx
import React from "react";
import { Typography } from "@mui/material";
import LoginProxy from "./LoginProxy";

const LoginProxyTest: React.FC = () => {
  return (
    <LoginProxy
      content={
        <React.Fragment>
          <Typography variant="h1">This is a test</Typography>
          <Typography variant="body1">LoginProxy works!</Typography>
        </React.Fragment>
      }
    />
  );
};

export default LoginProxyTest;
