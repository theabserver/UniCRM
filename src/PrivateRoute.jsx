import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn =
    sessionStorage.getItem("user") &&
    sessionStorage.getItem("usertoken").length > 0;
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
