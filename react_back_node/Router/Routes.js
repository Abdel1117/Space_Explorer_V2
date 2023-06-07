const express = require('express');
const router = express.Router();
const userControlleur = require("../Controller/userControlleur");
const articleController = require('../Controller/ArticleController');
const tokenChecker = require('../Functions/authChecker/tokenChecker');
const validator = require("../Functions/RegexFunction/Validation")
const validationUser = require('../Functions/RegexFunction/ValidationUserConnexion')
const upload = require("../Functions/FileHandler/imagHandler")
const validatioonArticleText = require("../Functions/RegexFunction/ValidationArticle")
/* Router for the user inscription */
router.post("/inscription", validator.createUser, userControlleur.inscriptionHandler)
router.post("/connexion", validationUser.checkUser, userControlleur.connexionHandler);
router.get("/check", tokenChecker);
router.get("/userProfil/:id", userControlleur.getInfo)
router.post("/ajoutArticle", upload.single('image'), validatioonArticleText.checkArticle, articleController.addArticle)
module.exports = router;