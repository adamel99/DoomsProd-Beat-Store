const express = require('express');
const { Product } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all Products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log('Products fetched:', products); // Log the products
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    next(error);
  }
});

// Get a specific Product by ID
router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// Create a new Product
router.post('/', requireAuth, async (req, res, next) => {
  try {
    // Log the request body
    console.log('Request body:', req.body);

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only admins can create products.' });
    }

    const { productName, productType, price, description, filePath } = req.body;

    const newProduct = await Product.create({
      productName,
      productType,
      price,
      description,
      filePath,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    next(error);
  }
});


// Update a Product by ID
router.put('/:productId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only admins can update products.' });
    }

    const productId = req.params.productId;
    const { productName, productType, price, description, filePath } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    product.productName = productName;
    product.productType = productType;
    product.price = price;
    product.description = description;
    product.filePath = filePath;

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// Delete a Product by ID
router.delete('/:productId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only admins can delete products.' });
    }

    const productId = req.params.productId;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await product.destroy();

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
