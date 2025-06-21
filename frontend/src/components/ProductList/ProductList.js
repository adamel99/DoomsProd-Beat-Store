import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useHistory } from 'react-router-dom';
import ProductCard from "../ProductCard/ProductCard";
import * as productActions from "../../store/products";
import { motion } from "framer-motion";

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allProducts = useSelector((state) => state.products.allProducts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(productActions.getAllProductsThunk());
  }, [dispatch]);

  const allProductsArray = allProducts ? Object.values(allProducts) : [];

  // Determine admin (customize logic as needed)
  const isAdmin = sessionUser?.isAdmin || sessionUser?.email === "adamelh1999@gmail.com";

  return (
    <Box
      sx={{
        backgroundColor: "#141313",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
            mb: 4,
          }}
        >
          Available Beats
        </Typography>

        {/* Admin Create Button */}
        {isAdmin && (
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Button
              variant="contained"
              onClick={() => history.push("/products/new")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "30px",
                fontWeight: 600,
                backgroundColor: "#ff4081",
                color: "#fff",
                boxShadow: "0 4px 20px #ff408122",
                "&:hover": {
                  backgroundColor: "#f50057",
                },
              }}
            >
              + Add New Product
            </Button>
          </Box>
        )}

        {/* Product Grid */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {allProductsArray.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard customProduct={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductList;
