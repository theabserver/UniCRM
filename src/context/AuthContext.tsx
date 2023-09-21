import React, { useContext, useState, useEffect } from "react";
import supabase from "../supabase";

const AuthContext = React.createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const register = (email, password) =>
    supabase.auth.signUp({ email, password });

  // Sign In with GOOGLE
  const signInWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  // Sign In with EMAIL and PASSWORD
  const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  const passwordReset = (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

  const signOut = () => supabase.auth.signOut();

  const getAsyncLoadingState = () => loading;
  const setAsyncLoadingState = (state: boolean) => {
    setLoading(state);
  };

  // TODO
  const updatePassword = (updatedPassword) =>
    supabase.auth.updateUser({ password: updatedPassword });

  const getUserSession = () => sessionStorage.getItem("app_user");

  const setUserSession = (user) =>
    sessionStorage.setItem("app_user", (user && JSON.stringify(user)) || "");

  const value = {
    currentUser,
    isAuthenticated,
    signIn,
    register,
    signInWithGoogle,
    signOut,
    passwordReset,
    updatePassword,
    getUserSession,
    getAsyncLoadingState,
    setAsyncLoadingState,
  };

  const setData = (data) => {
    setCurrentUser(data.user);
    setisAuthenticated(data.auth);
    setLoading(false);
    setUserSession(data.user);
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      switch (event) {
        case "INITIAL_SESSION":
          if (session != null && session.access_token.length)
            setData({ user: session.user, auth: true });
          break;
        case "SIGNED_IN":
          setData({ user: session.user, auth: true });
          break;
        case "SIGNED_OUT":
          setData({ user: "", auth: false });
          break;
        case "PASSWORD_RECOVERY":
          setData({ user: "", auth: false });
          break;
        default:
          setData({ user: "", auth: false });
          setisAuthenticated(false);
          break;
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
