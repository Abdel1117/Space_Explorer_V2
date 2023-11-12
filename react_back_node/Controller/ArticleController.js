const Article = require("../Model/articleShema");
const { validationResult } = require('express-validator')

exports.addArticle = (req, res, next) => {


    const errors = validationResult(req);
    console.log(errors)
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
                    element.image = req.files[index].path

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


exports.getArticle = (req, res, next) => {
    const article = Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(err => res.status(400).json({ err }))


    console.log(article)
}
exports.getUniqueArticle = (req, res, next) => {
    const uniqueArticle = Article.findById({ _id: req.params.id })
        .then(article => res.status(200).json(article))
        .catch(err => res.status(401).json({ message: " Une erreure innatendu est survenu" + err }))
}

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