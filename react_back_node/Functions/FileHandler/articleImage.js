const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = require("./imagHandler");

// Image représentant l'article (champ "image" du formulaire), stockée dans image/Image_article
// et servie à la racine de l'API (cf. express.static dans index.js).
const ARTICLE_IMAGE_FOLDER = "Image_article";
const ARTICLE_IMAGE_DIR = path.join(__dirname, "..", "..", "image", ARTICLE_IMAGE_FOLDER);
const MAX_ARTICLE_IMAGE_SIZE = 10 * 1024 * 1024;

const uploadImage = upload(ARTICLE_IMAGE_FOLDER, {
    limits: { fileSize: MAX_ARTICLE_IMAGE_SIZE, files: 1 }
}).single("image");

// Middleware : enregistre l'image (facultative à ce stade) et renvoie une erreur 400 lisible si le fichier est refusé
const uploadArticleImage = (req, res, next) => {
    uploadImage(req, res, (err) => {
        if (!err) {
            return next();
        }
        let msg;
        if (err.code === "LIMIT_FILE_SIZE") {
            msg = `L'image ne doit pas dépasser ${MAX_ARTICLE_IMAGE_SIZE / (1024 * 1024)} Mo`;
        } else if (err.code === "INVALID_IMAGE_TYPE") {
            msg = err.message;
        } else if (err instanceof multer.MulterError) {
            msg = "Envoyez une seule image, dans le champ « image »";
        } else {
            console.error(err);
            return res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'image" });
        }
        return res.status(400).json({ errors: [{ msg, param: "image" }] });
    });
};

// Supprime une image d'article du disque ; une erreur ne bloque pas la requête
const removeArticleImage = (filename) => {
    if (!filename) {
        return;
    }
    fs.unlink(path.join(ARTICLE_IMAGE_DIR, path.basename(filename)), (err) => {
        if (err && err.code !== "ENOENT") {
            console.error(err);
        }
    });
};

module.exports = { ARTICLE_IMAGE_DIR, uploadArticleImage, removeArticleImage };
