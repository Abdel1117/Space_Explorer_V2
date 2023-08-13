const { validationResult } = require('express-validator')
const Image = require("../Model/imageShema");
const multer = require('multer');

exports.addImage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    } else {
        const image = req.file;
        const image_desc = req.body.image_desc;
        const ImageEntry = new Image({
            image: image.path,
            imageDesc: image_desc
        })


        ImageEntry.save()
            .then(() => {
                return res.status(201).json({ message: "Image ajouté avec succées" })
            })
            .catch((err) => {
                return res.status(500).json({ message: err })
            })

    }
}
