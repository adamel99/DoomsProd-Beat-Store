const express = require('express');
const { Transaction } = require('../../db/models');

const router = express.Router();

// POST /api/transactions
router.post('/', async (req, res, next) => {
    try {
        const { productId, quantity, totalAmount } = req.body;
        const userId = req.user.id;

        const newTransaction = await Transaction.create({
            productId,
            userId,
            quantity,
            totalAmount,
        });

        return res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
});

// GET /api/transactions/user
router.get('/user', async (req, res, next) => {
    try {
        const userId = req.user.id;

        const userTransactions = await Transaction.findAll({
            where: { userId },
        });

        return res.status(200).json(userTransactions);
    } catch (error) {
        next(error);
    }
});

// PUT /api/transactions/:transactionId
router.put('/:transactionId', async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const transaction = await Transaction.findByPk(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        // Update the transaction status (modify as needed)
        transaction.status = 'completed';
        await transaction.save();

        return res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/transactions/:transactionId
router.delete('/:transactionId', async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const transaction = await Transaction.findByPk(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        await transaction.destroy();

        return res.status(204).json();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
