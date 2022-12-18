const User = require('../Model/userShema');
const bcrypt = require("bcrypt");

exports.inscriptionHandler = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        });
        user.save()
        .then(() => {res.status(201).json({message : "Utilisateur crée"})})
        .catch(error => res.status(400).json({error}));
    })    
    .catch( err => res.status(500).json({err}));
    
}