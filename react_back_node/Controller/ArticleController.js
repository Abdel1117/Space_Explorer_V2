const { cp } = require("fs");
const Article = require("../Model/articleShema");
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const fs = require("fs")
exports.addArticle = (req, res, next) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            let contenu = JSON.parse(req.body.contenu)
            const date = new Date();
            let day = date.getDate();

            let month = date.getMonth() + 1;
            let Year = date.getFullYear();
            let dateOfPublication = `${day}-${month}-${Year}`
            if (req.files && req.files.length === contenu.length) {
                contenu.forEach((element, index) => {
                    const image = req.files[index]
                    element.image = image.filename
                });
            }
            const articleEntry = new Article({
                Title: JSON.parse(req.body.titre),
                Slugs: JSON.parse(req.body.slugs),
                Contenu: contenu,
                dateOfPublication
            })

            articleEntry.save()
                .then(() => { return res.status(201).json({ message: "Article crée avec succées" }) })
                .catch(error => { return res.status(400).json({ error }) })
        } catch (error) {
            return res.status(400).json({ message: "Une erreur inconnue est survenu" })
        }
    }
}

exports.deleteArticle = (req, res, next) => {
    try {
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({ message: "Token introuvable !" })
            }
            jwt.verify(token, process.env.AUTH_TOKKEN_CODE, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Token invalide !" })
                }
            })
        }
        catch (e) {
            return res.status(500).json({ message: "Une erreure innatendu est survenu" })
        }
        const articletId = req.params.id
        Article.find()
            .then(article => {
                try {
                    const allArticle = article
                    const result = allArticle.filter((uniqueArticle) => uniqueArticle._id.toString() === req.params.id)
                    if (result.length === 0) {
                        return res.status(200).json({ message: "Aucun article correspondant retrouvé" })
                    }
                    else {
                        const article = result[0]
                        if (article && article.Contenu ) {
                        
                        for (let i = 0; i < article.Contenu.length; i++) {
                            const filePath = article.Contenu[i].image;

                            const fullPath = `./image/Image_Article/${filePath}`
                            try {
                                fs.unlink(fullPath, (err) => {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json({ message: "Erreur lors de la suppression du fichier" });
                                    }
                                })
                            } catch (error) {
                                console.log(error)
                            }
                           
                        }
                        Article.deleteOne({ "_id": articletId })
                            .then(() => {
                                return res.status(200).json({ message: `L'article à bien était supprimé` })
                            })
                            .catch((err) => {
                                return res.status(500).json({ message: "Impossible de supprimer l'article" });
                            })
                    }
                }
                } catch (error) {
                    console.log(error)
                }
            })
            .catch((e) => {
                console.log(e)
                return res.status(500).json({ message: "Impossible de supprimer l'article " })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Impossible d'éffectuer l'action" })
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


exports.editArticle = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let title = JSON.parse(req.body.titre);
        let slugs = JSON.parse(req.body.slugs);
        let contenu = JSON.parse(req.body.contenu)

        const images = req.files.map(file => file.filename);


        let updatedSections = contenu.map((section, index) => {

            return {
                _id: section._id || new mongoose.Types.ObjectId(),
                titre: section.titre,
                contenu: section.contenu,
                image: Object.keys(section.image).length !== 0 ? section.image : images.shift()
            };
        });

        let update = {
            Title: title,
            Slugs: slugs,
            Contenu: updatedSections
        };

        await Article.findByIdAndUpdate(req.params.id, update, { new: false });
        res.status(200).json({ message: "Article modifié avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur inconnue est survenue" });
    }
};


exports.getSearchResultArticle = async (req, res, next) => {

    try {
        const { query } = req.body;
        const articles = await Article.find({
            $or: [
                { Title: new RegExp(query, 'i') },
                { "Slugs": new RegExp(query, 'i') }
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