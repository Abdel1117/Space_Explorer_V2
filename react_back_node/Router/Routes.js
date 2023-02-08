const express = require('express');
const router = express.Router();
const userControlleur = require("../Controller/userControlleur");
const tokenChecker = require('../Functions/authChecker/tokenChecker');
const validator = require("../Functions/RegexFunction/Validation")

/* Router for the user inscription */
router.post("/inscription",validator.createUser, userControlleur.inscriptionHandler)
router.post("/connexion",userControlleur.connexionHandler);
router.get("/check" , tokenChecker);
module.exports = router;