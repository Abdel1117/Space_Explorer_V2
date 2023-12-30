const { cp } = require("fs");
const Article = require("../Model/articleShema");
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
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
                console.log(req.files.length)
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
    console.log("La route de supression ")

    try {
        const tokken = req.headers.authorization;
        const tokkenSplited = tokken.split(' ')[1]
        if (!tokkenSplited) { return res.status(401).json({ message: "Une erreur interne c'est produite veuillez ressayer" }) }

        const articletId = req.params.id
        Article.find()
            .then(article => {
                try {
                    const allArticle = article

                    const result = allArticle.filter((uniqueArticle) => uniqueArticle._id.toString() === req.params.id)

                    console.log(result)

                    if (result.length === 0) {
                        return res.status(200).json({ message: "Aucun article correspondant retrouvé" })
                    }
                    else {
                        Article.deleteOne({ "_id": articletId })
                            .then(() => {
                                return res.status(200).json({ message: `L'article à bien était supprimé` })
                            })
                            .catch((err) => {
                                return res.status(500).json({ message: "Impossible de supprimer l'article" });
                            })
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


    console.log(article)
}
exports.getUniqueArticle = (req, res, next) => {
    console.log(`${req.params.id} est mon id`)
    const uniqueArticle = Article.findById({ _id: req.params.id })
        .then(article => res.status(200).json(article))
        .catch(err => res.status(401).json({ message: " Une erreure innatendu est survenu" + err }))

    console.log(uniqueArticle)
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