const express = require('express');
const router = express.Router();
const { Cart, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET /api/carts - Get current user's cart
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { userId }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/carts - Create a cart for a user (if it doesn't exist)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({
        userId,
        total: 0.00
      });
    }

    return res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

// PUT /api/carts - Update total price (for now, simple)
router.put('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { total } = req.body;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.total = total;
    await cart.save();

    return res.json(cart);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/carts - Delete user's cart (optional)
router.delete('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    await cart.destroy();

    return res.json({ message: 'Cart deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
