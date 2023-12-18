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

exports.deleteImage = (req, res, next) => {

    console.log("La route de supression ")

    try {
        const tokken = req.headers.authorization;
        const tokkenSplited = tokken.split(' ')[1]
        if (!tokkenSplited) { return res.status(401).json({ message: "Une erreur interne c'est produite veuillez ressayer" }) }

        const imageId = req.params.id
        Image.find()
            .then(image => {
                try {
                    const allImage = image

                    const result = allImage.filter((uniqueImage) => uniqueImage._id.toString() === req.params.id)
                    if (result.length === 0) {
                        return res.status(200).json({ message: "Aucune image correspondant retrouvé" })
                    }
                    else {
                        Image.deleteOne({ "_id": imageId })
                            .then(() => {
                                return res.status(200).json({ message: `L'image à bien était supprimé` })
                            })
                            .catch((err) => {
                                return res.status(500).json({ message: "Impossible de supprimer l'image" });
                            })
                    }
                } catch (error) {
                    console.log(error)
                }
            })
            .catch((e) => {
                console.log(e)
                return res.status(500).json({ message: "Impossible de supprimer l'image " })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Impossible d'éffectuer l'action" })
    }
}

exports.editImage = (req, res, next) => {
    console.log("Hello route edit Image")
}
exports.getImage = (req, res, next) => {

    const image = Image.find()
        .then(images => res.status(200).json(images))
        .catch(err => res.status(400).json({ err }))

}