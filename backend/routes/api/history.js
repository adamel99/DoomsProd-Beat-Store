const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Order, License, Product, User } = require('../../db/models');

const router = express.Router();

// GET /history - Get current user's history (orders + licenses)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const [orders, licenses] = await Promise.all([
      Order.findAll({
        where: { userId: req.user.id },
        include: {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        order: [['createdAt', 'DESC']],
      }),
      License.findAll({
        where: { userId: req.user.id },
        include: {
          model: Product,
          attributes: ['id', 'productName', 'price']
        },
        order: [['createdAt', 'DESC']],
      }),
    ]);

    return res.status(200).json({ orders, licenses });
  } catch (err) {
    next(err);
  }
});

// GET /history/:userId - Admin: get another user's history
router.get('/:userId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view other users\' history.' });
    }

    const userId = req.params.userId;

    const [orders, licenses] = await Promise.all([
      Order.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'username', 'email']
        },
        order: [['createdAt', 'DESC']],
      }),
      License.findAll({
        where: { userId },
        include: {
          model: Product,
          attributes: ['id', 'productName', 'price']
        },
        order: [['createdAt', 'DESC']],
      }),
    ]);

    return res.status(200).json({ orders, licenses });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
