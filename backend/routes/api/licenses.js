const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { License } = require('../../db/models');

const router = express.Router();

// GET all licenses (public)
router.get('/', async (req, res, next) => {
  try {
    const licenses = await License.findAll({
      order: [['price', 'ASC']],
    });

    return res.status(200).json(licenses);
  } catch (err) {
    next(err);
  }
});

// GET a single license by ID (public)
router.get('/:licenseId', async (req, res, next) => {
  try {
    const { licenseId } = req.params;

    const license = await License.findByPk(licenseId);

    if (!license) {
      return res.status(404).json({ message: 'License not found.' });
    }

    return res.status(200).json(license);
  } catch (err) {
    next(err);
  }
});

// POST a new license (admin only)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create licenses.' });
    }

    const { name, price, description, downloadLimit } = req.body;

    const newLicense = await License.create({
      name,
      price,
      description,
      downloadLimit,
    });

    return res.status(201).json(newLicense);
  } catch (err) {
    next(err);
  }
});

// PUT update license (admin only)
router.put('/:licenseId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update licenses.' });
    }

    const { licenseId } = req.params;
    const license = await License.findByPk(licenseId);

    if (!license) {
      return res.status(404).json({ message: 'License not found.' });
    }

    const { name, price, description, downloadLimit } = req.body;

    if (name !== undefined) license.name = name;
    if (price !== undefined) license.price = price;
    if (description !== undefined) license.description = description;
    if (downloadLimit !== undefined) license.downloadLimit = downloadLimit;

    await license.save();

    return res.status(200).json(license);
  } catch (err) {
    next(err);
  }
});

// DELETE a license (admin only)
router.delete('/:licenseId', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete licenses.' });
    }

    const { licenseId } = req.params;
    const license = await License.findByPk(licenseId);

    if (!license) {
      return res.status(404).json({ message: 'License not found.' });
    }

    await license.destroy();

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
