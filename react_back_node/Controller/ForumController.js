const { populate } = require("dotenv");
const forumShema = require("../Model/forumSubject");
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

exports.addSujet = (req, res, next) => {
    console.log(req.body)
    const tokken = req.headers.authorization;

    const tokkenSplited = tokken.split(' ')[1]

    const decode = jwt.verify(tokkenSplited, "RANDOM_TOKEN_SECRET", function (err, decoded) {
        if (err) {
            res.status(403).json({ message: "Veuillez vous connecter afin de pouvoir poster un nouveau sujet" })
        } else {
            return decoded
        }
    })

    console.log(decode.userId)
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
            User: decode.userId,
        })
        nouveauSujet.save()
            .then(() => res.status(201).json({ message: "Noveau sujet ajouter avec succès" }))
            .catch(e => res.status(500).json({ message: e }))
    }
}



exports.findSujet = (req, res, next) => {

}