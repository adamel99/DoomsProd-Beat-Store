import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
    }

    setErrors({});
    try {
      await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 500,
        borderRadius: 0,
        p: 3,
        background: "black",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 30px black",
        border: "1px solid black",
        margin: "0 auto",

      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00e5ff", fontWeight: "bold" }}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: "#80deea" } }}
              />
              {errors.email && <Alert severity="error">{errors.email}</Alert>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: "#80deea" } }}
              />
              {errors.username && <Alert severity="error">{errors.username}</Alert>}
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputLabelProps={{ style: { color: "#80deea" } }}
              />
              {errors.firstName && <Alert severity="error">{errors.firstName}</Alert>}
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputLabelProps={{ style: { color: "#80deea" } }}
              />
              {errors.lastName && <Alert severity="error">{errors.lastName}</Alert>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#80deea" } }}
              />
              {errors.password && <Alert severity="error">{errors.password}</Alert>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#80deea" } }}
              />
              {errors.confirmPassword && (
                <Alert severity="error">{errors.confirmPassword}</Alert>
              )}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #00e5ff, #ff69b4)",
              color: "black",
              '&:hover': {
                background: "linear-gradient(90deg, #00bcd4, #ff4081)",
              },
            }}
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupFormModal;
