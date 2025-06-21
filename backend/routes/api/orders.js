const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Order, User } = require('../../db/models');

const router = express.Router();

// Get all orders (Admin only)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admins only.' });
    }

    const orders = await Order.findAll({
      include: { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// Get all orders for the logged-in user
router.get('/my', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// Get a specific order by ID (admin or owner)
router.get('/:orderId', requireAuth, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (req.user.role !== 'admin' && req.user.id !== order.userId) {
      return res.status(403).json({ message: 'Unauthorized to view this order.' });
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// Create a new order (authenticated user)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { totalPrice, orderStatus } = req.body;

    const newOrder = await Order.create({
      userId: req.user.id,
      totalPrice: totalPrice || 0.00,
      orderStatus: orderStatus || 'pending',
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// Update order status (admin only)
router.put('/:orderId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admins only.' });
    }

    const { orderId } = req.params;
    const { orderStatus, totalPrice } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (totalPrice !== undefined) order.totalPrice = totalPrice;

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

// Delete an order (admin only)
router.delete('/:orderId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admins only.' });
    }

    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await order.destroy();

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
