const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { EmailLog, User } = require('../../db/models');

const router = express.Router();

// GET /email-logs - Admin: get all email logs
router.get('/', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view all email logs.' });
    }

    const logs = await EmailLog.findAll({
      include: {
        model: User,
        attributes: ['id', 'email', 'username'],
      },
      order: [['sentAt', 'DESC']],
    });

    return res.status(200).json(logs);
  } catch (err) {
    next(err);
  }
});

// GET /email-logs/user - User: get own email logs
router.get('/user', requireAuth, async (req, res, next) => {
  try {
    const logs = await EmailLog.findAll({
      where: { userId: req.user.id },
      order: [['sentAt', 'DESC']],
    });

    return res.status(200).json(logs);
  } catch (err) {
    next(err);
  }
});

// GET /email-logs/:id - View a single log (admin or owner)
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const log = await EmailLog.findByPk(req.params.id);

    if (!log) {
      return res.status(404).json({ message: 'Email log not found.' });
    }

    if (req.user.role !== 'admin' && req.user.id !== log.userId) {
      return res.status(403).json({ message: 'Unauthorized to view this log.' });
    }

    return res.status(200).json(log);
  } catch (err) {
    next(err);
  }
});

// POST /email-logs - Admin only: create an email log manually
router.post('/', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create email logs manually.' });
    }

    const { userId, subject, body, status } = req.body;

    const newLog = await EmailLog.create({
      userId,
      subject,
      body,
      status,
      sentAt: new Date(),
    });

    return res.status(201).json(newLog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
