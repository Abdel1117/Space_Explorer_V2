const { check } = require("express-validator")
const Sujet = require('../../Model/forumSubject');
const mongoose = require("mongoose");


exports.checkSujetForm = [
    check("Forum_title")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Veuillez taper un titre qui contient 3 à 20 caractères"),

    check("Slug")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Veuillez selectionner une catégorie valide"),

    check("Sujet")
        .trim()
        .isLength({ min: 9 })
        .withMessage("Veuillez donner plus d'information pour que les gens puisse vous comprendre !")
]