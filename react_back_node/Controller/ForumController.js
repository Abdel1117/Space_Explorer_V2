const { populate } = require("dotenv");
const forumShema = require("../Model/forumSubject");
const { validationResult } = require("express-validator")


exports.addSujet = (req, res, next) => {
    console.log(req.body)
    
    const errors = validationResult(req);
    const { Forum_title, Slug, Sujet } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    else {
        const nouveauSujet = new forumShema({
            Title: Forum_title,
            Slug: Slug,
            Sujet: Sujet,
            user: req.id,
        })
        nouveauSujet.save()
            .then(() => res.status(201).json({ message: "Noveau sujet ajouter avec succès" }))
            .catch(e => res.status(500).json({ message: e }))
    }
}



exports.findSujet = (req, res, next) => {

}