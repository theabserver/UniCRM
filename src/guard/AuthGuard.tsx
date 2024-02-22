import type { FC, ReactNode } from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../view/LoadingScreen";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const { isAuthenticated, getUserSession, getAsyncLoadingState } = useAuth();
  const isLoading = getAsyncLoadingState();
  console.log("AuthGuard");
  console.log(`Loading: ${isLoading}`);
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) {
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
