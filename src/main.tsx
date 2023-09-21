import App from "./app.tsx";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import React from "react";
import AuthProvider from "./context/AuthContext";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const DebugRouter = ({ children }: { children: any }) => {
  const location = useLocation();
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
        location.state
      )}`
    );
    console.log(children);
  }

  return children;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DebugRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DebugRouter>
    </BrowserRouter>
  </React.StrictMode>
);
