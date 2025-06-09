import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import SignUpFormModal from "../SignUpFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { motion } from "framer-motion";

const LandingPage = () => {
  const amazingUser = useSelector((state) => state.session.user);

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          background: "rgba(15, 32, 39, 0.5)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: 1,
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
          py: { xs: 10, md: 16 },
          textAlign: "center",
          background: "linear-gradient(to bottom, #0f2027 0%, #1a2a33 100%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              fontSize: { xs: "2rem", md: "3.5rem" },
              textTransform: "uppercase",
              color: "white",
            }}
          >
            EXPLORE // CREATE // PROTECT
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", mb: 4, mt: 2 }}
          >
            Dive into development, music production, and plugin innovation.
          </Typography>
          {!amazingUser && (
            <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: "30px",
                fontWeight: 600,
                backgroundColor: "#00e5ff",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#00bcd4",
                },
              }}
              onClick={() => document.querySelector("#cta-footer").scrollIntoView({ behavior: "smooth" })}
            >
              Join the Magic
            </Button>
          )}
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ py: 10 }} maxWidth="lg">
        <Grid container spacing={6} justifyContent="center">
          {[{
            title: "Explore Projects",
            description: "High-quality beats, sample kits, and exclusive drops ready for your next project.",
            to: "/products",
            color: "#00e5ff",
          }, {
            title: "About the Creator",
            description: "Get to know the vision behind Adam’s Hub — from VSTs to mastering production.",
            to: "/about",
            color: "#ff69b4",
          }, {
            title: "Skills",
            description: "Check out the full-stack, plugin dev, and cybersecurity skills that power the hub.",
            to: "/skills",
            color: "#64ffda",
          }].map(({ title, description, to, color }) => (
            <Grid item xs={12} md={4} key={title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <NavLink to={to} style={{ textDecoration: "none", color }}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 6,
                    borderRadius: 6,
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(20px)",
                    textAlign: "center",
                    color: color,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: `0 0 30px ${color}33`,
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: `0 12px 40px ${color}55`,
                    },
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                      {title}
                  </Typography>
                  <Typography color="text.secondary">{description}</Typography>
                </Paper>
                </NavLink>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Footer */}
      {!amazingUser && (
        <Box
          id="cta-footer"
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
