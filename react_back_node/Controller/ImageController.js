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
        const slug_Image = req.body.Slug
        const ImageEntry = new Image({
            image: image.path,
            imageDesc: image_desc,
            Slugs: slug_Image
        })


        ImageEntry.save()
            .then(() => {
                return res.status(201).json({ message: "Image ajouté avec succées, voullez vous rajouter une autre image" })
            })
            .catch((err) => {
                return res.status(500).json({ message: err })
            })

    }
}


exports.getImage = (req, res, next) => {

    const image = Image.find()
        .then(images => res.status(200).json(images))
        .catch(err => res.status(400).json({ err }))

}