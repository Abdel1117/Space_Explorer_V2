const { check, validationResult } = require("express-validator");


exports.checkImage = [

    check("image")
        .trim()
        .not()
        .isEmpty(),


    check("imageDesc")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Veuillez taper un text court qui puisse décrire l'image afin de facilité l'accésibilté")
        .isLength({ min: 10, max: 30 })
        .withMessage("Veuillez taper une décription avec un minimum de 10 caractères et au maximum de 30 caractères")
]