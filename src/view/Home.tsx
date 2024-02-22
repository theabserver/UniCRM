import React, { useState } from "react";
import Box from "@mui/material/Box";
import { AppNavigation } from "../component/AppNavigation";
// import { styled } from "@mui/material/styles";
import Footer from "../component/Footer";

const Home = () => {
  console.log("Home.jsx");

  return (
    <>
      <AppNavigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: `calc(100vh - 136px)`,
        }}
      ></Box>
      <Footer />
    </>
  );
};

export default Home;
