const mongoose = require('mongoose');

const User =new mongoose.Schema(
    {
        // id: number,
        username: {
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
        }
    },
    { timestamps: true}
);
module.exports = mongoose.model("User", User);