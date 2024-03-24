const express = require('express');
const router = express.Router();
const userControlleur = require("../Controller/userControlleur");
const validationUser = require('../Functions/RegexFunction/ValidationUserConnexion');
const checkInscription = require("../Functions/RegexFunction/Validation")
const upload = require("../Functions/FileHandler/imagHandler");

/* User Route */
router.post("/inscription", checkInscription.createUser, userControlleur.inscriptionHandler);
router.post("/connexion", validationUser.checkUser, userControlleur.connexionHandler);
router.post("/sub",userControlleur.addSub)

router.get("/userProfil/:id", userControlleur.getInfo)
router.get("/getAllUsers", userControlleur.getAllUsers)
router.put("/editUser/:id", userControlleur.editUser)
router.put("/editAvatar/:id", upload("avatar").single('imageProfil'), userControlleur.editAvatar)
router.delete("/deleteUser/:id", userControlleur.deleteUser)

module.exports = router