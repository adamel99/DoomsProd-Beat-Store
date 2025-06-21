import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import * as productActions from "../../store/products";

const NewProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
//   const [licenseId, setLicenseId] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newProduct = {
      userId: user.id, // automatically attach logged in user
      title,
      description,
      price,
      audioUrl,
      imageUrl,
      genre,
      type,
    };

    try {
      await dispatch(productActions.createProductThunk(newProduct));
      history.push("/products");
    } catch (err) {
      setErrors(err.errors || ["Something went wrong"]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Create New Product
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {errors.map((err, idx) => (
          <Typography key={idx} color="error">{err}</Typography>
        ))}

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextField
          label="Description"
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <TextField
          label="Audio URL"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          required
        />

        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <TextField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />

        <FormControl fullWidth required>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="beat">Beat</MenuItem>
            <MenuItem value="loop">Loop</MenuItem>
            <MenuItem value="kit">Kit</MenuItem>
          </Select>
        </FormControl>

        {/* <TextField
          label="License ID"
          type="number"
          value={licenseId}
          onChange={(e) => setLicenseId(e.target.value)}
          helperText="Enter a valid license ID (optional)"
        /> */}

        <Button variant="contained" color="primary" type="submit">
          Create Product
        </Button>
      </Box>
    </Container>
  );
};

export default NewProduct;
