import { Box, Typography, Link, Theme } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
      component="footer"
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        Oxford Group of Institutions ©{new Date().getFullYear()}
        <br />
        <Link
          color="inherit"
          href="https://github.com/theabserver?tab=repositories"
        >
          Created by Theabserver in {new Date().getFullYear()}
          {"."}
        </Link>
      </Typography>
    </Box>
  );
}
