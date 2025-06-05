import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";

import {
  Box,
  Button,
  TextField,
  Typography,
  Card as MuiCard,
  CardContent,
  Alert,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  borderRadius: 0,
  padding: theme.spacing(3),
  margin: "0 auto",
  background: "black",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 30px black",
  border: "1px solid black",
}));

const NeonButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5),
  fontWeight: "bold",
  background: "linear-gradient(90deg, #00e5ff, #ff69b4)",
  color: "black",
  '&:hover': {
    background: "linear-gradient(90deg, #00bcd4, #ff4081)",
  },
}));

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const minUsernameLength = 4;
  const minPasswordLength = 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const isButtonDisabled =
    credential.length < minUsernameLength || password.length < minPasswordLength;

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00e5ff", fontWeight: "bold" }}
        >
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ style: { color: "#80deea" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          {errors.credential && <Alert severity="error">{errors.credential}</Alert>}

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ style: { color: "#80deea" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          {errors.password && <Alert severity="error">{errors.password}</Alert>}

          <NeonButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isButtonDisabled}
          >
            Log In
          </NeonButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LoginFormModal;
