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
  Divider,
  IconButton,
  InputBase,
} from "@mui/material";
import { motion } from "framer-motion";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignUpFormModal from "../SignUpFormModal";

const LandingPage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          background: "rgba(20, 19, 19, 0.6)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 6 },
            minHeight: 72,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              fontSize: "1.25rem",
              color: "primary.main",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Adam? I don't even know him
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <NavLink to="/products" style={{ textDecoration: "none" }}>
              <Button variant="text" color="inherit">
                Products
              </Button>
            </NavLink>
            <NavLink to="/about" style={{ textDecoration: "none" }}>
              <Button variant="text" color="inherit">
                About
              </Button>
            </NavLink>
            <NavLink to="/cart">
              <Button color="primary">Cart</Button>
            </NavLink>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.05)",
                px: 1,
              }}
            >
              <InputBase placeholder="Search…" sx={{ ml: 1, color: "inherit" }} />
              <IconButton sx={{ p: 0.5 }} color="primary">
                {/* <SearchIcon /> */}
              </IconButton>
            </Box>
            {!user && (
              <OpenModalMenuItem
                itemText="Sign Up"
                modalComponent={<SignUpFormModal />}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        sx={{
          py: { xs: 12, md: 18 },
          backgroundColor: "#141313",
          textAlign: "center",
          color: "text.primary",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "4rem" },
              letterSpacing: "-1px",
              textTransform: "uppercase",
              lineHeight: 1.15,
            }}
          >
            // Invest // In // Your // Sound
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 3,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Studio-quality beats and samples for artists ready to grow.
          </Typography>
          {!user && (
            <Button
              variant="contained"
              sx={{
                mt: 5,
                px: 6,
                py: 1.8,
                borderRadius: 99,
                fontWeight: 700,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #ff4081, #ff6699)",
                boxShadow: "0 8px 30px rgba(255, 64, 129, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff6699, #ff4081)",
                },
              }}
              onClick={() =>
                document.querySelector("#cta-footer")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Join the Vibe
            </Button>
          )}
        </Container>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />

      {/* FEATURE CARDS */}
      <Container sx={{ py: 10 }} maxWidth="lg">
        <Grid container spacing={6} justifyContent="center">
          {[
            {
              title: "Browse Beats",
              description:
                "Exclusive beats across genres. Preview, license, and download instantly.",
              to: "/products",
              color: "#ff4081",
            },
            {
              title: "Meet the Creator",
              description:
                "Learn about the artist behind the beats and the vision behind the sound.",
              to: "/about",
              color: "#ff4081",
            },
            {
              title: "Pick Your License",
              description:
                "Explore licensing options and pick what fits your project needs.",
              to: "/products",
              color: "#ff4081",
            },
          ].map(({ title, description, to, color }) => (
            <Grid item xs={12} md={4} key={title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <NavLink to={to} style={{ textDecoration: "none" }}>
                  <Paper
                    elevation={10}
                    sx={{
                      p: 6,
                      borderRadius: "24px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(20px)",
                      textAlign: "center",
                      color: "text.primary",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: `0 12px 40px ${color}22`,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 16px 48px ${color}55`,
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

      {/* CTA FOOTER */}
      {!user && (
        <Box
          id="cta-footer"
          sx={{
            background: "linear-gradient(to right, #0e0e0e, #1a1a1a)",
            py: 8,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "primary.main", fontWeight: 700, fontSize: "1.5rem" }}
          >
            Ready to license your next hit?
          </Typography>
          <OpenModalMenuItem
            itemText="Create an account"
            modalComponent={<SignUpFormModal />}
            className="cta-btn"
          />
        </Box>
      )}
    </>
  );
};

export default LandingPage;
