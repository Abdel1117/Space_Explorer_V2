
const upload = require("../Functions/FileHandler/imagHandler");
const express = require('express');
const router = express.Router();
const imageController = require("../Controller/ImageController")

/* Image Crud */
router.get("/getImage", imageController.getImage)
router.get("/getImageById/:id", imageController.getUniqueImage)
router.post("/ajoutImage", upload("galerie").single('image'), imageController.addImage)
router.delete("/deleteImage/:id", imageController.deleteImage)
router.put("/editImage/:id", upload("galerie").single('image'), imageController.editImage)

module.exports = router