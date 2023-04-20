const mongoose = require("mongoose");

const user = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Utilisateur" }
});


module.exports = mongoose.model('User', user);
