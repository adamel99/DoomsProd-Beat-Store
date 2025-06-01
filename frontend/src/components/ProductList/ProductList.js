// ProductList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
import ProductCard from "../ProductCard/ProductCard";
import * as productActions from "../../store/products";

const ProductList = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);

  // Fetch all products when the component mounts
  useEffect(() => {
    console.log("pre-dispatch");
    dispatch(productActions.getAllProductsThunk());
  }, [dispatch]);

  // Convert the object of products into an array
  const allProductsArray = allProducts ? Object.values(allProducts) : [];

  return (
    <div className="products-view">
      <section className="products-list">
        <h1>Products</h1>
        {/* Render ProductCard for each product */}
        {allProductsArray.map((product) => (
          <ProductCard customProduct={product} key={product.id} />
        ))}
      </section>
    </div>
  );
};

export default ProductList;
