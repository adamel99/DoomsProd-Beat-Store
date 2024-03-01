const express = require('express');
const { Product } = require('../../db/models');

const router = express.Router();

// POST /api/products
router.post('/', async (req, res, next) => {
    try {
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
        next(error);
    }
});

// PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
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

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
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

// GET /api/products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll();

        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
