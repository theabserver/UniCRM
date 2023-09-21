import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../context/AuthContext";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../supabase";
import { Auth } from "@supabase/auth-ui-react";
import { Navigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

export const Login = () => {
  const { signIn, signInWithGoogle, isAuthenticated, setAsyncLoadingState } =
    useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const resp = await signIn(data.get("email"), data.get("password"));
    console.log(resp);
  };

  const googleSignIn = async (event) => {
    event.preventDefault();
    const resp = await signInWithGoogle();
    console.log(resp);
  };

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {
              <Button
                variant="outlined"
                onClick={googleSignIn}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            }
            <Grid container>
              <Grid item xs>
                <Link href="/authentication/passwordreset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/authentication/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Auth supabaseClient={supabase} providers={["google"]}  appearance={{ theme: ThemeSupa }}/> */}
          </Box>
        </Box>
      </Container>
    </>
  );
};
