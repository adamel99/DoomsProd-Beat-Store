import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductThunk, deleteProductThunk } from "../../store/products";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ADMIN_EMAIL = "adamelh1999@gmail.com";

const ProductCard = ({ customProduct }) => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();

  const isStandalone = !!productId;

  const product = useSelector((state) => state.products.singleProduct);
  const currentUser = useSelector((state) => state.session.user);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (isStandalone) {
      dispatch(getSingleProductThunk(productId));
    }
  }, [dispatch, productId, isStandalone]);

  if (isStandalone && !product) return <Typography>Loading...</Typography>;

  const displayedProduct = isStandalone ? product : customProduct;
  if (!displayedProduct) return null;

  const { title, price, description, imageUrl, audioUrl, id } = displayedProduct;

  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  const handleClick = () => {
    if (!isStandalone) {
      history.push(`/products/${id}`);
    }
  };

  const handleUpdate = () => {
    history.push(`/products/${id}/edit`); // your edit page route
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteProductThunk(id));
    setDeleteDialogOpen(false);
    history.push("/products");
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: isStandalone ? 700 : 350,
          margin: isStandalone ? "2rem auto" : undefined,
          cursor: !isStandalone ? "pointer" : "default",
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 30px rgba(255, 64, 129, 0.15)",
        }}
        onClick={handleClick}
        role={!isStandalone ? "button" : undefined}
        tabIndex={!isStandalone ? 0 : undefined}
        onKeyPress={(e) => {
          if (!isStandalone && (e.key === "Enter" || e.key === " ")) handleClick();
        }}
      >
        <CardMedia
          component="img"
          height={isStandalone ? "400" : "200"}
          image={imageUrl || audioUrl || "/default-image.png"}
          alt={`Product: ${title}`}
        />
        <CardContent sx={{ color: "#f5f5f5" }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            Price: ${price}
          </Typography>

          {isAdmin && isStandalone && (
            <Box mt={3} display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the product "{title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
