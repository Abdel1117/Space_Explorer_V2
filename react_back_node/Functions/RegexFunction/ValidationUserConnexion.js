const {check} = require("express-validator")
const User = require('../../Model/userShema');
const mongoose = require("mongoose");


exports.checkUser = [

    check("emailInput")
    .trim()
    .isEmail()
    .toLowerCase()
    .withMessage("Veuillez renseigner un email valide")
    .isLength({min:3})
    .withMessage('Veuillez renseigner un email valide'),


    check("passwordInput")
    .trim()
    .isLength({min:3})
    .withMessage('Veuillez renseigner un mot de passe valide')

]