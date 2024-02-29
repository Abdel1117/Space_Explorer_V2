const { check } = require("express-validator");
const User = require('../../Model/userShema');
const mongoose = require("mongoose");

exports.createUser = [
    check("pseudo")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Veuillez renseigner un Pseudo Valide")
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
        .withMessage("Veuillez resneigner un Pseudo Valide qui contient au moins un lettre en Majuscule, une lettre en minuscule ainsi qu'un chiffre ou nombre")
        .custom(value => {
            var query = User.find({ pseudo: value })
            return query.exec().then(user => {
                if (user.length > 0) {
                    return Promise.reject("Pseudo déja utilisé ")
                }
            })
        }),
    check("emailInput")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Veuillez renseigner un email valide")
        .isLength({ min: 3 })
        .withMessage('Veuillez renseigner un email valide')
        .custom(value => {
            var query = User.find({ email: value })
            return query.exec().then(user => {
                if (user.length > 0) {
                    return Promise.reject("E-mail déja utilisé ")
                }
            })
        }),
    check("passwordInput")
        .trim()
        .isStrongPassword({ minLength: 8 })
        .withMessage("Veuillez taper un mot de passe qui contient au moins caractère")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage("Veuillez renseigner un mot de passe qui contient au moins 8 caractère avec au moins un chiffre une lettre et un caractère spécial")
        .custom((value, { req }) => {
            if (value === req.body.confirm_passwordInput) {

                return true
            } else {

                return false
            }
        })
        .withMessage("Les mots de passe ne sont pas identique"),
    check("accept_condition")
        .isBoolean()

        .custom((value, { req }) => {
            console.log(req.body.accept_condition)
            if (req.body.accept_condition != true) {
                return Promise.reject("Veuillez accepter les conditions d'utilisattion");
            }
            else {

                return true
            }
        })
        .withMessage("Veuillez accepter les conditions d'utilisattion"),
]