const multer = require("multer");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {

    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
}

// busboy (utilisé par multer 1.x) décode les noms de fichiers en latin1 :
// "Planète.png" arrive sous la forme "PlanÃ¨te.png". On le relit en UTF-8 quand c'est possible.
const decodeOriginalName = (name) => {
    if (!/[\u0080-\u00ff]/.test(name) || /[^\u0000-\u00ff]/.test(name)) {
        return name;
    }
    const utf8 = Buffer.from(name, "latin1").toString("utf8");
    return utf8.includes("\uFFFD") ? name : utf8;
}

function imageValidation(dossier) {

    return multer.diskStorage({


        destination: (req, file, callback) => {
            const dir = path.join(__dirname, "..", "..", "image", dossier)
            // Crée le dossier s'il n'existe pas encore (nouveau dossier, conteneur Docker neuf...)
            fs.mkdir(dir, { recursive: true }, (err) => callback(err, dir));
        },


        filename: (req, file, callback) => {
            const name = decodeOriginalName(file.originalname);
            const nameWithoutExt = path.basename(name, path.extname(name))
            const extention = MIME_TYPES[file.mimetype];
            console.log(extention)
            if (extention) {
                const date = Date.now();
                const finalName = `${nameWithoutExt}_${date}.${extention}`;
                callback(null, finalName);
            } else {
                const error = new Error("Nous n'acceptons que les images de type PNG, JPEG, JPG ou Webp");
                error.code = "INVALID_IMAGE_TYPE";
                callback(error);
            }

        }
    })
}

// options : options multer supplémentaires (ex: { limits: { fileSize } })
const upload = (dossier, options = {}) => multer({ ...options, storage: imageValidation(dossier) })
module.exports = upload