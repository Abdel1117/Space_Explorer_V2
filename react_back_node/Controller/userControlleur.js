const User = require('../Model/userShema');
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
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


exports.connexionHandler = (req, res, next) => {
    const email = req.body.emailInput;
    const password = req.body.passwordInput;
    console.log(email)
    User.findOne({email})
    .then(user => {
        if(!user ){
            return res.status(401).json({message : "Paire login"});
        }
        bcrypt.compare(password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({message : "mot de passe incorrecte"})
            }
            res.status(200).json({
                userId : user._id,
                token: jwt.sign(
                    {
                    userId : user._id},
                    "RANDOM_TOKEN_SECRET", 
                    {expiresIn : "2h"}
                )

            });
        })
        .catch(err => res.status(500).json({err}));
    })
    
    .catch(err => res.status(500).json({err}))

};