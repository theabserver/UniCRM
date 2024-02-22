import React, { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  //   PaletteColor,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  /* const theme = useTheme();
  const mybgColor: PaletteColor = theme.palette.secondary; */

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar sx={{ backgroundColor: "theme.palette.secondary" }}>
          <PersonIcon />
        </Avatar>
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
