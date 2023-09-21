import React, { useState } from "react";
import Box from "@mui/material/Box";
import MiniDrawer from "../Components/Sidebar";
import { styled } from "@mui/material/styles";
import Footer from "../Components/Footer";
import { Students } from "./Students";
import { Dashboard } from "./Dashboard";
import { Faculty } from "./Faculty";
import { Messages } from "./Messages";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Home = () => {
  const [currentComponent, setCurrentComponent] = useState("dashboard");
  // change state from child by passing in a callback as props that updates state in parent
  const setComponent = (component) => {
    setCurrentComponent(component);
  };
  const renderComponent = () => {
    switch (currentComponent) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "messages":
        return <Messages />;
      case "faculty":
        return <Faculty />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
        <MiniDrawer navCB={setComponent} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pl: 12,
            pt: 11,
            minHeight: `calc(100vh - 136px)`,
          }}
        >
          Home
          {renderComponent()}
        </Box>
        <Footer />
    </>
  );
};
