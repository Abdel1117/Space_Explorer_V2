const Article = require("../Model/articleShema");
const { validationResult } = require('express-validator')
const multer = require("multer")
const { sanitizeArticleHtml } = require("../Functions/Sanitize/sanitizeArticleHtml")
const { removeArticleImage } = require("../Functions/FileHandler/articleImage")
const {
    MAX_CONTENT_IMAGE_SIZE,
    uploadContentImage,
    contentImageUrl,
    extractContentImageFiles,
    removeContentImages
} = require("../Functions/FileHandler/articleContentImage")

// Un article : Title, Slug (une catégorie), Image (image représentant l'article) et Contenu (HTML CKEditor).
// Champs reçus en multipart/form-data : titre, slug, contenu et le fichier "image".

exports.addArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        removeArticleImage(req.file?.filename)
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
        return res.status(400).json({ errors: [{ msg: "Veuillez ajouter une image représentant l'article", param: "image" }] });
    }

    try {
        await new Article({
            Title: req.body.titre,
            Slug: req.body.slug,
            Image: req.file.filename,
            Contenu: sanitizeArticleHtml(req.body.contenu)
        }).save();
        return res.status(201).json({ message: "Article crée avec succées" })
    } catch (error) {
        console.error(error)
        removeArticleImage(req.file.filename)
        return res.status(500).json({ message: "Une erreur inconnue est survenue" })
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id)
        if (!article) {
            return res.status(404).json({ message: "Aucun article correspondant retrouvé" })
        }
        removeArticleImage(article.Image)
        removeContentImages(extractContentImageFiles(article.Contenu))
        return res.status(200).json({ message: `L'article à bien était supprimé` })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ message: "Aucun article correspondant retrouvé" })
        }
        console.error(error)
        return res.status(500).json({ message: "Impossible de supprimer l'article" })
    }
}

exports.getArticle = (req, res, next) => {
    const article = Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(err => res.status(400).json({ err }))
}
exports.getUniqueArticle = (req, res, next) => {
    const uniqueArticle = Article.findById({ _id: req.params.id })
        .then(article => res.status(200).json(article))
        .catch(err => res.status(401).json({ message: " Une erreure innatendu est survenu" + err }))

}

// L'image est facultative en modification : sans nouveau fichier, l'image actuelle est conservée
exports.editArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        removeArticleImage(req.file?.filename)
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const update = {
            Title: req.body.titre,
            Slug: req.body.slug,
            Contenu: sanitizeArticleHtml(req.body.contenu)
        };
        if (req.file) {
            update.Image = req.file.filename;
        }

        const previousArticle = await Article.findByIdAndUpdate(req.params.id, update, { new: false, runValidators: true });
        if (!previousArticle) {
            removeArticleImage(req.file?.filename)
            return res.status(404).json({ message: "Aucun article correspondant retrouvé" })
        }

        // Nettoie les fichiers devenus inutiles : ancienne image et images retirées du corps de l'article
        if (req.file) {
            removeArticleImage(previousArticle.Image)
        }
        const keptImages = new Set(extractContentImageFiles(update.Contenu));
        removeContentImages(extractContentImageFiles(previousArticle.Contenu).filter((file) => !keptImages.has(file)));

        return res.status(200).json({ message: "Article modifié avec succès" });
    } catch (error) {
        removeArticleImage(req.file?.filename)
        if (error.name === "CastError") {
            return res.status(404).json({ message: "Aucun article correspondant retrouvé" })
        }
        console.error(error);
        return res.status(500).json({ message: "Une erreur inconnue est survenue" });
    }
};



// Upload d'une image insérée dans le corps d'un article depuis CKEditor 4
// (bouton Image > Téléverser, glisser-déposer ou collage).
// Réponse au format attendu par CKEditor : { uploaded: 1, fileName, url } ou { uploaded: 0, error: { message } }.
// CKEditor n'affiche notre message que pour une réponse 2xx : un fichier refusé renvoie donc un 200 avec uploaded: 0.
exports.uploadContentImage = (req, res) => {
    uploadContentImage(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(200).json({ uploaded: 0, error: { message: `L'image ne doit pas dépasser ${MAX_CONTENT_IMAGE_SIZE / (1024 * 1024)} Mo` } });
            }
            if (err.code === "INVALID_IMAGE_TYPE") {
                return res.status(200).json({ uploaded: 0, error: { message: err.message } });
            }
            if (err instanceof multer.MulterError) {
                return res.status(200).json({ uploaded: 0, error: { message: "Envoyez une seule image à la fois" } });
            }
            console.error(err);
            return res.status(500).json({ uploaded: 0, error: { message: "Une erreur est survenue lors de l'envoi de l'image" } });
        }

        if (!req.file) {
            return res.status(200).json({ uploaded: 0, error: { message: "Aucune image reçue" } });
        }

        return res.status(201).json({
            uploaded: 1,
            fileName: req.file.filename,
            url: contentImageUrl(req.file.filename)
        });
    });
};

exports.getSearchResultArticle = async (req, res, next) => {

    try {
        const { query } = req.body;
        const articles = await Article.find({
            $or: [
                { Title: new RegExp(query, 'i') },
                { Slug: new RegExp(query, 'i') }
            ]
        });
        return res.json(articles)
    } catch (error) {
        res.status(500).send("Une erreur lors de la recherche c'est produite")
    }
}


exports.addFavorite = async (req, res, next) => {

    try {
        const user = req.body.user
        const article = req.body.idArticle

        const allArticle = await Article.findALl()
        const foundArticle = allArticle.filter((article, index) => {
            article._id === article
        })
        if (foundArticle.length == 0) {
            return res.status(404).json({ message: "Aucun article correspondont" })
        } else {
            const user = await User.findById(user._id)
            if (user) {
                User.save(article)
            }

        }
    } catch (error) {
        return res.status(500).json({ message: "Une erreur lors de l'ajout du favoris est survenu" })
    }

}