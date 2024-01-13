const mongoose = require("mongoose");

const user = mongoose.Schema({
    pseudo : {type : String, required : true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Utilisateur" },
    refreshToken: { type: String, default: "" }
});


module.exports = mongoose.model('User', user);
