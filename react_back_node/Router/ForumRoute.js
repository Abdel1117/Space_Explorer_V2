const express = require('express');
const router = express.Router();
const forumController = require("../Controller/ForumController");
const validationForumSujet = require("../Functions/RegexFunction/ValidationForumSujet");
const validationReponsesSujet = require("../Functions/RegexFunction/ValidationReponseSujet");

/* Forum CRUD */
router.get("/forum", forumController.findSujet);
router.get("/forum/:id", forumController.findSujetById)
router.post("/ajoutSujet", validationForumSujet.checkSujetForm, forumController.addSujet);
router.post("/ajoutReponse/:id", validationReponsesSujet.checkReponseSujet, forumController.addReponse)
router.post("/searchForum", forumController.getSearchResultForum)


module.exports = router