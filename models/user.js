const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
})

module.exports = mongoose.model("User", userSchema);