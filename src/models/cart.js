const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        productid: {
            type: String,
            ref: 'Product',
            required: true
        },
        userid: {
            type: String,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
