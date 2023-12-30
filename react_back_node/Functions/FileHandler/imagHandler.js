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
            const name = file.originalname;
            const nameWithoutExt = path.basename(name, path.extname(name))
            const extention = path.extname(name)
            const date = Date.now();
            const finalName = `${nameWithoutExt}_${date}`
            callback(null, finalName + extention);
        }
    })
}

const upload = dossier => multer({ storage: imageValidation(dossier) })

module.exports = upload