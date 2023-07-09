const Article = require("../Model/articleShema");
const { validationResult } = require('express-validator')

exports.addArticle = (req, res, next) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            let contenu = JSON.parse(req.body.contenu)

            if (req.files && req.files.length === contenu.length) {

                contenu.forEach((element, index) => {
                    element.image = req.files[index].path

                });
            }
            const articleEntry = new Article({
                Title: JSON.parse(req.body.titre),
                Slugs: JSON.parse(req.body.slugs),
                Contenu: contenu
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