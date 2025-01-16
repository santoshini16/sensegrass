const express = require('express');
const router = express.Router();
const { createPaymentIntent, saveTransaction, getTransactions } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPaymentIntent);
router.post('/save-transaction', saveTransaction);
router.get('/transactions', getTransactions);

module.exports = router;
