const { check, validationResult } = require("express-validator")
const Sujet = require('../../Model/forumSubject');


exports.checkReponseSujet = [
    check("Reponses.*.content")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Veuillez taper un message valide qui contient au moins 2 caractères"),

]