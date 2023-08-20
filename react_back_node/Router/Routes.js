const express = require('express');
const router = express.Router();
const userControlleur = require("../Controller/userControlleur");
const articleController = require('../Controller/ArticleController');
const imageController = require("../Controller/ImageController")
const tokenChecker = require('../Functions/authChecker/tokenChecker');
const validator = require("../Functions/RegexFunction/Validation")
const validationUser = require('../Functions/RegexFunction/ValidationUserConnexion')
const upload = require("../Functions/FileHandler/imagHandler")
const validatioonArticleText = require("../Functions/RegexFunction/ValidationArticle");
const refreshTokenController = require('../Controller/refreshTokenController');
/* Router for the user inscription */
router.post("/inscription", validator.createUser, userControlleur.inscriptionHandler);

/* Route for the Connexion */
router.post("/connexion", validationUser.checkUser, userControlleur.connexionHandler);
router.get("/", articleController.getArticle);


/* Route for the Permission & token */
router.get("/check", tokenChecker);
router.get("/refreshToken", refreshTokenController.handleRefreshToken);
router.get("/userProfil/:id", userControlleur.getInfo)

/* CRUD */
router.post("/ajoutArticle", upload("Image_article").array('images'), validatioonArticleText.checkArticle, articleController.addArticle);
router.post("/ajoutImage", upload("galerie").single('image'), imageController.addImage)
router.post("/searchArticle", articleController.getSearchResultArticle)

module.exports = router;