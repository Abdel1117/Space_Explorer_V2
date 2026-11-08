const { check } = require("express-validator");
const { stripHtml } = require("../Sanitize/sanitizeArticleHtml");

// À garder synchronisé avec react_front/src/componants/ArticleForm/articleRules.js
const ARTICLE_SLUGS = ["Planète", "Systeme Solaire", "Objet Stélaire", "Etoile", "Météorite"];
const MIN_ARTICLE_LENGTH = 400;
const MAX_ARTICLE_LENGTH = 20000;

// Champs envoyés en multipart/form-data : titre, slug, contenu (+ fichier "image")
exports.checkArticle = [
    check("titre")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Veuillez remplir ce champs avec un Titre")
        .isLength({ min: 3, max: 50 })
        .withMessage("Veuillez taper un titre qui contient 3 à 50 caractères"),

    check("slug")
        .isIn(ARTICLE_SLUGS)
        .withMessage("Veuillez choisir une catégorie pour l'article"),

    check("contenu")
        .custom((val) => {
            const textLength = stripHtml(val).length;
            if (textLength < MIN_ARTICLE_LENGTH || textLength > MAX_ARTICLE_LENGTH) {
                throw new Error(`Veuillez écrire un article de ${MIN_ARTICLE_LENGTH} à ${MAX_ARTICLE_LENGTH} caractères`);
            }
            return true;
        }),
];

exports.ARTICLE_SLUGS = ARTICLE_SLUGS;
exports.MIN_ARTICLE_LENGTH = MIN_ARTICLE_LENGTH;
exports.MAX_ARTICLE_LENGTH = MAX_ARTICLE_LENGTH;
