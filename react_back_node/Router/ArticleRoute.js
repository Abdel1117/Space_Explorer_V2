const express = require('express');
const router = express.Router();
const articleController = require('../Controller/ArticleController');
const upload = require("../Functions/FileHandler/imagHandler");
const validatioonArticleText = require("../Functions/RegexFunction/ValidationArticle");

/* Article CRUD */
router.get("/", articleController.getArticle);
router.get("/article/:id", articleController.getUniqueArticle)
router.post("/ajoutArticle", upload("Image_article").array('images'), validatioonArticleText.checkArticle, articleController.addArticle);
router.post("/searchArticle", articleController.getSearchResultArticle)
router.delete("/deleteArticle/:id", articleController.deleteArticle)
router.put("/editArticle/:id", upload("Image_article").array('images'), articleController.editArticle)

module.exports = router