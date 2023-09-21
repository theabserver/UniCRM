import "./app.css";
import { NotFound } from "./view/NotFound";
import { Login } from "./view/Login";
import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router";
import AuthGuard from "./guard/AuthGuard";
import { useAuth } from "./context/AuthContext";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
const Register = Loadable(lazy(() => import("./view/Register")));
const MainLayout = Loadable(lazy(() => import("./view/MainLayout")));
const PasswordReset = Loadable(lazy(() => import("./view/PasswordReset")));
const LoadingScreen = Loadable(lazy(() => import("./view/LoadingScreen")));

const App = () => {
  const { isLoading } = useAuth();
  const content = useRoutes([
    {
      path: "authentication",
      children: [
        {
          path: "login",
          element: isLoading ? <LoadingScreen /> : <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "passwordreset",
          element: <PasswordReset />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
    },
  ]);
  return content;
};
export default App;
