import "./app.css";
// import { NotFound } from "./view/NotFound";
// import MainLayout from "./view/MainLayout";
import { Login } from "./view/Login";
import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AuthGuard from "./guard/AuthGuard";
import { useAuth } from "./context/AuthContext";
import Home from "./view/Home";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
const Register = Loadable(lazy(() => import("./view/Register")));
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
          <Home />
        </AuthGuard>
      ),
    },
  ]);
  return content;
};
export default App;
