const multer = require("multer");
const path = require("path");


const MIME_TYPES = {

    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
}

const imageValidation = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "image");
        console.log("1")
    },


    filename: (req, file, callback) => {
        console.log("2")
        const name = file.originalname.split(" ").join("_");
        const extention = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extention);
    }
})

const upload = multer({ storage: imageValidation })

module.exports = upload