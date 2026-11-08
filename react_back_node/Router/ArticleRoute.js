const express = require('express');
const router = express.Router();
const articleController = require('../Controller/ArticleController');
const { uploadArticleImage } = require("../Functions/FileHandler/articleImage");
const { checkArticle } = require("../Functions/RegexFunction/ValidationArticle");
const requireAdmin = require("../Functions/authChecker/requireAdmin");

/* Article CRUD */
router.get("/", articleController.getArticle);
router.get("/article/:id", articleController.getUniqueArticle)
router.post("/searchArticle", articleController.getSearchResultArticle)

// Réservé aux administrateurs ; l'authentification est vérifiée avant d'écrire le moindre fichier
router.post("/ajoutArticle", requireAdmin, uploadArticleImage, checkArticle, articleController.addArticle);
router.put("/editArticle/:id", requireAdmin, uploadArticleImage, checkArticle, articleController.editArticle)
router.delete("/deleteArticle/:id", requireAdmin, articleController.deleteArticle)

/* Images insérées dans le corps de l'article depuis CKEditor */
router.post("/uploadImage", requireAdmin, articleController.uploadContentImage)

module.exports = router
