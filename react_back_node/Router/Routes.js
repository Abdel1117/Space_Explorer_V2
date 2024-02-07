const express = require('express');
const router = express.Router();
const userControlleur = require("../Controller/userControlleur");
const articleController = require('../Controller/ArticleController');
const imageController = require("../Controller/ImageController")
const tokenChecker = require('../Functions/authChecker/tokenChecker');
const validator = require("../Functions/RegexFunction/Validation");
const validationUser = require('../Functions/RegexFunction/ValidationUserConnexion');
const validationForumSujet = require("../Functions/RegexFunction/ValidationForumSujet");
const validationReponsesSujet = require("../Functions/RegexFunction/ValidationReponseSujet")

const upload = require("../Functions/FileHandler/imagHandler");
const validatioonArticleText = require("../Functions/RegexFunction/ValidationArticle");
const refreshTokenController = require('../Controller/refreshTokenController');
const forumController = require("../Controller/ForumController");
/* Router for the user inscription */
router.post("/inscription", validator.createUser, userControlleur.inscriptionHandler);

/* Route for the Connexion */
router.post("/connexion", validationUser.checkUser, userControlleur.connexionHandler);
/* Route for the Permission & token */
router.get("/check", tokenChecker);
router.get("/refreshToken", refreshTokenController.handleRefreshToken);

/* CRUD */
/* User CRUD */
router.get("/userProfil/:id", userControlleur.getInfo)
router.get("/getAllUsers", userControlleur.getAllUsers)
router.put("/editUser/:id", userControlleur.editUser)
router.put("/editAvatar/:id", upload("avatar").single('imageProfil'), userControlleur.editAvatar)
router.delete("/deleteUser/:id", userControlleur.deleteUser)
/* Article CRUD */
router.get("/", articleController.getArticle);
router.get("/article/:id", articleController.getUniqueArticle)
router.post("/ajoutArticle", upload("Image_article").array('images'), validatioonArticleText.checkArticle, articleController.addArticle);
router.post("/searchArticle", articleController.getSearchResultArticle)
router.delete("/deleteArticle/:id", articleController.deleteArticle)
router.put("/editArticle/:id", upload("Image_article").array('images'), articleController.editArticle)
/* Galerie Crud */
router.get("/getImage", imageController.getImage)
router.get("/getImageById/:id", imageController.getUniqueImage)
router.post("/ajoutImage", upload("galerie").single('image'), imageController.addImage)
router.delete("/deleteImage/:id", imageController.deleteImage)
router.put("/editImage/:id", upload("galerie").single('image'), imageController.editImage)
/* Forum CRUD */
router.get("/forum", forumController.findSujet);
router.get("/forum/:id", forumController.findSujetById)
router.post("/ajoutSujet", validationForumSujet.checkSujetForm, forumController.addSujet);
router.post("/ajoutReponse/:id", validationReponsesSujet.checkReponseSujet, forumController.addReponse)
router.delete("/deleteSujet/:id", forumController.deleteSujet)
router.put("/editSujet/:id", forumController.editSujet)
module.exports = router;