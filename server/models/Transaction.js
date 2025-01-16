const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    product: String,
    price: Number,
    currency: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
