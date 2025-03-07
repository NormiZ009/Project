const mongoose = require('mongoose');

const orderitemSchema = new mongoose.Schema(
    {
        productid: {
            type: String,
            ref: 'Product',
            required: true
        },
        orderid: {
            type: String,
            ref: 'Order',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("orderitem", orderitemSchema);
