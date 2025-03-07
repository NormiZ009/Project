const mongoose = require('mongoose');

const User =new mongoose.Schema(
    {
        productName: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            default: "0.0"
        },
        description: {
            type: String,
            default: ""
        },
        proimage: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: ""
        }
    },
    { timestamps: true}
);
module.exports = mongoose.model("Product", User);