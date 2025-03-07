const mongoose = require('mongoose');

const User =new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            default: ""
        },
        user_type: {
            type: Number,
            default: "",
            Comment: "1= seller, 2=admin"
        }
    },
    { timestamps: true}
);
module.exports = mongoose.model("Seller", User);