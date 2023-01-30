const User = require('../Model/userShema');
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');

exports.inscriptionHandler = (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       
        return res.status(400).json({errors : errors.array()});
    }
    else{
        
        bcrypt.hash(req.body.passwordInput, 10)
        .then(hash => {
            const user = new User({
                email : req.body.emailInput,
                password : hash
            });
            user.save()
            .then(() => {res.status(201).json({message : "Utilisateur crée"})})
            .catch(error => res.status(400).json({error}));
        })    
        .catch( err => res.status(500).json({err}));
    }
}