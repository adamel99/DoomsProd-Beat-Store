const express = require('express');
const { Product } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log('Products fetched:', products);
    return res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    next(error);
  }
});

// GET /api/products/:productId - Get a product by ID
router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    next(error);
  }
});

// POST /api/products - Create a new product (Admin only)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Only admins can create products.' });
    }

    const { title, description, price, audioUrl, imageUrl, licenseId } = req.body;

    if (!title || !price ) {
      return res.status(400).json({ message: 'title and price are required.' });
    }

    const newProduct = await Product.create({
      title,
      description: description || '',
      price,
      audioUrl: audioUrl || '',
      imageUrl: imageUrl || '',
      licenseId,
      userId: req.user.id,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    next(error);
  }
});


// PUT /api/products/:productId - Update a product by ID (Admin only)
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

    // Update only if provided
    if (productName !== undefined) product.productName = productName;
    if (productType !== undefined) product.productType = productType;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (filePath !== undefined) product.filePath = filePath;

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    next(error);
  }
});

// DELETE /api/products/:productId - Delete a product by ID (Admin only)
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
    return res.status(200).json({ message: "Product deleted successfully." });

  } catch (error) {
    console.error('Error deleting product:', error);
    next(error);
  }
});

module.exports = router;
