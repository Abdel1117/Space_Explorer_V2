const multer = require("multer");
const path = require("path");


const MIME_TYPES = {

    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
}



function imageValidation(dossier) {

    return multer.diskStorage({


        destination: (req, file, callback) => {
            const dir = path.join(__dirname, "..", "..", "image", dossier)
            callback(null, dir);
        },


        filename: (req, file, callback) => {
            const name = file.originalname.split(" ").join("_");
            const extention = MIME_TYPES[file.mimetype];
            callback(null, name + Date.now() + "." + extention);
        }
    })
}

const upload = dossier => multer({ storage: imageValidation(dossier) })

module.exports = upload