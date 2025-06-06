import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Container } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import * as productActions from "../../store/products";

const ProductList = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    dispatch(productActions.getAllProductsThunk());
  }, [dispatch]);

  const allProductsArray = allProducts ? Object.values(allProducts) : [];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
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
        Products
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
          justifyItems: "center",
        }}
      >
        {allProductsArray.map((product) => (
          <ProductCard customProduct={product} key={product.id} />
        ))}
      </Box>
    </Container>
  );
};

export default ProductList;
