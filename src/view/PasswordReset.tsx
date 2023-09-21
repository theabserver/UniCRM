import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await passwordReset(emailRef.current.value);
      console.log(error);
      console.log(data);
      setMsg("Password reset has been sent to your email");
    } catch (e) {
      console.log(e);
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
            Reset your Password
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
              ref={emailRef}
            />
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
              Send Reset Link
            </Button>
          </Box>
        </Box>
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Back to Login? <Link to={"/authentication/login"}>Login</Link>
        </Typography>
      </Container>
    </>
  );
};

export default PasswordReset;
