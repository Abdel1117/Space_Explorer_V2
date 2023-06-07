const articleShema = require("../Model/articleShema");
const { validationResult } = require('express-validator')

exports.addArticle = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const articleEntry = new articleShema({
            Title: req.body.titre,
            Slugs: req.body.slugs,
            Contenu: req.body.contenu
        })

        articleEntry.save()
            .then(() => { res.status(201).json({ message: "Article crée avec succées" }) })
            .catch(error => res.status(400).json({ error }))

    }


}