const mongoose = require('mongoose');
const cart = require('./cart');

const order = new mongoose.Schema(
    {
        userid: {
            type: String,
            ref: 'User',
            required: true
        },
        fullname: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        zip: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", order);
