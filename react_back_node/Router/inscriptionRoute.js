const express = require('express');
const router = express.Router();
const User = require("../Model/userShema")
const userControlleur = require("../Controller/userControlleur")

/* Router for the user inscription */
router.post("/inscription", userControlleur.inscriptionHandler)


module.exports = router;