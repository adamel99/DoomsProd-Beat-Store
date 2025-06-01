// ProductCard.js
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductThunk } from "../../store/products";
import "./ProductCard.css";

const ProductCard = ({ customProduct }) => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();

  // Determine mode: standalone page (route has :productId) or list view
  const isStandalone = !!productId;

  // If in standalone mode, fetch product data from store
  const product = useSelector((state) => state.products.singleProduct);

  useEffect(() => {
    if (isStandalone) {
      dispatch(getSingleProductThunk(productId));
    }
  }, [dispatch, productId, isStandalone]);

  // Pick the right product to show
  const displayedProduct = isStandalone ? product : customProduct;

  if (!displayedProduct) return null;

  const { productName, price, description, filePath, id } = displayedProduct;

  const handleClick = () => {
    if (!isStandalone) {
      history.push(`/products/${id}`);
    }
  };

  return (
    <div className={`product-card ${isStandalone ? "standalone" : ""}`} onClick={handleClick}>
      <img src={filePath} alt={`Product: ${productName}`} />
      <div className="product-details">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
