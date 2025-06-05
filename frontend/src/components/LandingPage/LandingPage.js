import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import SignUpFormModal from "../SignUpFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const LandingPage = () => {
  const amazingUser = useSelector((state) => state.session.user);

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textShadow: "0 1px 4px rgba(0,255,255,0.4)",
            }}
          >
            Adam's Hub
          </Typography>
          {!amazingUser && (
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignUpFormModal />}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          py: 12,
          textAlign: "center",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "white",
              textShadow: "0 4px 20px rgba(0,255,255,0.3)",
            }}
          >
            EXPLORE // CREATE // PROTECT
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", mb: 4 }}
          >
            Dive into development, music production, and plugin innovation.
          </Typography>
          {!amazingUser && (
            <OpenModalMenuItem
              itemText="Join the Magic"
              modalComponent={<SignUpFormModal />}
              className="cta-btn"
            />
          )}
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ py: 10 }} maxWidth="lg">
  <Grid
    container
    spacing={6}
    justifyContent="center"
    alignItems="stretch"
  >
    <Grid item xs={12} md={6}>
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 8,
          maxWidth: 500, // optional to limit width
          margin: "0 auto", // center inside Grid item
          background: "linear-gradient(145deg, rgba(0,30,60,0.7), rgba(0,0,0,0.6))",
          border: "1px solid rgba(0, 229, 255, 0.3)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          color: "#e0f7fa",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 0 30px rgba(0, 229, 255, 0.1)",
          '&:hover': {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 40px rgba(0,229,255,0.3)",
          },
        }}
      >
              <Typography variant="h4" gutterBottom>
                <NavLink to="/products" style={{ textDecoration: "none", color: "#00e5ff" }}>
                  🎧 Explore Products
                </NavLink>
              </Typography>
              <Typography color="text.secondary">
                High-quality beats, sample kits, and exclusive drops ready for your next project.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 8,
          maxWidth: 500,
          margin: "0 auto",
          background: "linear-gradient(145deg, rgba(32,50,80,0.7), rgba(0,0,0,0.6))",
          border: "1px solid rgba(255, 105, 180, 0.2)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          color: "#fce4ec",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 0 30px rgba(255, 105, 180, 0.1)",
          '&:hover': {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 40px rgba(255, 105, 180, 0.3)",
          },
        }}
      >
              <Typography variant="h4" gutterBottom>
                <NavLink to="/about" style={{ textDecoration: "none", color: "rgba(255, 105, 180)" }}>
                  👤 About the Creator
                </NavLink>
              </Typography>
              <Typography color="text.secondary">
                Get to know the vision behind Adam’s Hub — from VSTs to mastering production.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
    <Paper
      elevation={8}
      sx={{
        p: 6,
        borderRadius: 8,
        background: "linear-gradient(145deg, rgba(0,60,90,0.7), rgba(0,0,0,0.6))",
        border: "1px solid rgba(100, 255, 218, 0.2)",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        color: "#ccf2f4",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 0 30px rgba(100, 255, 218, 0.1)",
        '&:hover': {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 40px rgba(100, 255, 218, 0.3)",
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        <NavLink to="/skills" style={{ textDecoration: "none", color: "#64ffda" }}>
          💡 Skills
        </NavLink>
      </Typography>
      <Typography color="text.secondary">
        Check out the full-stack, plugin dev, and cybersecurity skills that power the hub.
      </Typography>
    </Paper>
  </Grid>
        </Grid>
      </Container>

      {/* CTA Footer */}
      {!amazingUser && (
        <Box
          sx={{
            background: "linear-gradient(to right, #0f2027, #203a43)",
            py: 6,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#80deea" }}>
            Ready to explore?
          </Typography>
          <OpenModalMenuItem
            itemText="Create an account!"
            modalComponent={<SignUpFormModal />}
            className="cta-btn"
          />
        </Box>
      )}
    </>
  );
};

export default LandingPage;
