const { default: mongoose } = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);