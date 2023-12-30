const { validationResult } = require('express-validator')
const Image = require("../Model/imageShema");
const multer = require('multer');
const fs = require("fs")


exports.addImage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    } else {
        const image = req.file;
        const image_desc = JSON.parse(req.body.image_desc);
        const slug_Image = JSON.parse(req.body.Slug);
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
                console.log(err)
                return res.status(500).json({ message: err })
            })

    }
}

exports.deleteImage = (req, res, next) => {

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
                        return res.status(404).json({ message: "Aucune image correspondant retrouvé" })
                    }
                    else {

                        console.log(result)
                        const filePath = result[0].image;
                        // Assurez-vous que 'path' est le bon champ
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ message: "Erreur lors de la suppression du fichier" });
                            }
                        }
                        )

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

exports.editImage = async (req, res, next) => {
    console.log("Hello route edit Image");

    try {
        const imageFile = req.file; // Nouveau fichier image, si fourni
        const slugs = req.body.editedSlug ? JSON.parse(req.body.editedSlug) : undefined;
        const imageDesc = req.body.image_desc ? JSON.parse(req.body.image_desc) : undefined;
        console.log(slugs)
        const imageId = req.params.id;
        console.log("Image ID:", imageId);

        console.log("Nouvelles données:", { imageFile, slugs, imageDesc });

        const currentImage = await Image.findById(imageId);
        if (!currentImage) {
            return res.status(404).json({ message: "Image non trouvée" });
        }

        const updateData = {};
        if (imageFile) {
            updateData.image = imageFile.path;
            // Supprimer l'ancien fichier image
            await new Promise((resolve, reject) => {
                fs.unlink(currentImage.image, err => {
                    if (err) {
                        console.error("Erreur lors de la suppression de l'ancien fichier image", err);
                        reject(err);
                    }
                    resolve();
                });
            });
        }
        if (slugs) updateData.Slugs = slugs;
        if (imageDesc) updateData.imageDesc = imageDesc;

        console.log("Données de mise à jour:", updateData);

        await Image.findByIdAndUpdate(imageId, updateData);


        return res.status(200).json({ messaage: "Image modifier avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'image:", error);
        return res.status(500).json({ message: "Une erreur inattendue est survenue" });
    }
};
exports.getImage = (req, res, next) => {

    const image = Image.find()
        .then(images => { return res.status(200).json(images) })
        .catch(err => { return res.status(400).json({ err }) })

}


exports.getUniqueImage = (req, res, next) => {

    try {
        const images = Image.find()
            .then(image => {
                const allImage = image

                const result = allImage.filter((uniqueImage) => uniqueImage._id.toString() === req.params.id)

                if (result.length === 0) {
                    return res.status(404).json({ message: "Aucune image correspondant retrouvé" })
                } else {
                    console.log(result)
                    return res.status(200).json(result)
                }


            })
            .catch((error) => {
                console.log(error)
                return res.status(500).json({ message: "Une erreur inatendu est survenu" })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "une erreur inatendu est survenu" })
    }

}
