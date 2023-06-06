const multer = require("multer");
const path = require("path");


const MIME_TYPES = {

    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "/image");
    },


    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extention = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extention);
    }
})

module.exports = multer({ storage: storage })