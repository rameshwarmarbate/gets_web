import React from "react";
import "./ComingSoon.css";
import { Box, CssBaseline, CssVarsProvider } from "@mui/joy";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ComingSoon = () => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            // px: { xs: 2, md: 6 },
            // pt: {
            //   xs: "calc(12px + var(--Header-height))",
            //   sm: "calc(12px + var(--Header-height))",
            //   md: 3,
            // },
            // pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <div className="coming-soon">
            <div className="content">
              <h1>We're Launching Soon!</h1>
              <p>Stay tuned for something amazing.</p>
            </div>
          </div>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default ComingSoon;
