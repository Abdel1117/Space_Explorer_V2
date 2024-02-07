const mongoose = require("mongoose");

const user = mongoose.Schema({
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    role: { type: String, default: "Utilisateur" },
    isPrenium: { type: Boolean, default: false, required: true },
    refreshToken: { type: String, default: "" }
});


module.exports = mongoose.model('User', user);
