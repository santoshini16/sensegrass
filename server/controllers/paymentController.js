require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

const createPaymentIntent = async (req, res) => {
    const { price, product, currency = "INR" } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price * 100, 
            currency,
            description: product,
            payment_method_types: ['card'],
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const saveTransaction = async (req, res) => {
    const { product, price, currency } = req.body;
    try {
        const transaction = new Transaction({ product, price, currency });
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(200).send(transactions);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createPaymentIntent,
    saveTransaction,
    getTransactions
};
