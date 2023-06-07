const { check, validationResult } = require("express-validator");

exports.checkArticle = [
    check("titre")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Veuillez remplir ce champs avec un Titre")
        .isLength({ min: 3, max: 18 })
        .withMessage("Veuillez taper un titre qui contient 3 à 20 caractères"),

    check("slugs")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Veuillez sélectionner au moins un Slug pour l\'article en question'),

    check('contenu.*.titre')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Veuillez taper un titre de section')
        .isLength({ min: 3, max: 40 })
        .withMessage('Veuillez taper un Titre qui contien au moins 3 caractères et au maxmimum 40 caractères'),

    check('contenu.*.contenu')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Veuillez taper une section d\'article')
        .custom(val => {

            const value = val.replace(/\s/g, "")

            if (value.length > 1200 || value.length < 400) {
                throw new Error("Veuillez écrire une section d'article avec au minimum 400 charactères et au maximum 1200 charactères")
            }
            return true
        }),


    check('contenu.*.image')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Veuillez insérer une image qui puisse accompagner le paragraphe'),


];
