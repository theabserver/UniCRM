import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget),
      fieldData = {
        email: data.get("email"),
        password: data.get("password"),
      };
    console.log(fieldData);
    if (!fieldData.email || !fieldData.password) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        fieldData.email,
        fieldData.password
      );
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account: " + error);
    }
    setLoading(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Register
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
            {errorMsg && (
              <Alert severity="error" onClose={() => setErrorMsg("")}>
                {errorMsg}
              </Alert>
            )}
            {msg && (
              <Alert severity="success" onClose={() => setMsg("")}>
                {msg}
              </Alert>
            )}
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
          <Typography sx={{ textAlign: "center", mt: 3 }}>
            Back to Login? <Link to={"/authentication/login"}>Login</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Register;
