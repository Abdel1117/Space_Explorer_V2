const express = require('express');
const router = express.Router();
const userControlleur = require("../Controller/userControlleur");
const validationUser = require('../Functions/RegexFunction/ValidationUserConnexion');
const upload = require("../Functions/FileHandler/imagHandler");

/* User Route */
router.post("/connexion", validationUser.checkUser, userControlleur.connexionHandler);
router.get("/userProfil/:id", userControlleur.getInfo)
router.get("/getAllUsers", userControlleur.getAllUsers)
router.put("/editUser/:id", userControlleur.editUser)
router.put("/editAvatar/:id", upload("avatar").single('imageProfil'), userControlleur.editAvatar)
router.delete("/deleteUser/:id", userControlleur.deleteUser)

module.exports = router