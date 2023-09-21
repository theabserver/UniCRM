import type { FC, ReactNode } from "react";
import React from "react";
import { useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Login } from "../view/Login";
import { useAuth } from "../context/AuthContext";
import Register from "../view/Register";
import PasswordReset from "../view/PasswordReset";
import LoadingScreen from "../view/LoadingScreen";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const { isAuthenticated, getUserSession, getAsyncLoadingState } = useAuth();
  const location = useLocation(),
    isLoading = getAsyncLoadingState();
  console.log(`Loading: ${isLoading}`);
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) {
    /* const path = location.pathname;
    if (path.includes("/register")) return <Register />;
    if (path.includes("/passwordreset")) return <PasswordReset />; */
    return <Navigate to="/authentication/login" />;
  }
  console.log(`Auth: ${isAuthenticated}`);
  const isSessionActive = getUserSession() != "";
  console.log(`User session: ${isSessionActive}`);
  return (isAuthenticated || isSessionActive) && <>{children}</>;

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  /* if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  } */
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
