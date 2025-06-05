import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
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
    <div className="products-view">
      <section className="products-list">
        <h1 className="products-title">Products</h1>
        {allProductsArray.map((product) => (
          <ProductCard customProduct={product} key={product.id} />
        ))}
      </section>
    </div>
  );
};

export default ProductList;
