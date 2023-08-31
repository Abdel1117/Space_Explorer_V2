const forumShema = require("../Model/forumSubject");
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken");
const formatDateToDDMMYYYY = require("../Functions/DateFormat/DateFormat");

exports.addSujet = (req, res, next) => {
    const tokken = req.headers.authorization;
    const tokkenSplited = tokken.split(' ')[1]
    
    if (!tokkenSplited) { return res.status(401).json({ message: "Une erreur interne c'est produite veuillez ressayer" }) }
    const decode = jwt.verify(tokkenSplited, "RANDOM_TOKEN_SECRET", function (err, decoded) {
        if (err) {
            res.status(403).json({ message: "Veuillez vous connecter afin de pouvoir poster un nouveau sujet" })
        } else {
            return decoded
        }
    })

    const errors = validationResult(req);
    const { Forum_title, Slug, Sujet } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    else {

        let date = new Date();
        const dateReformated = formatDateToDDMMYYYY(date);
        console.log(dateReformated);
        const nouveauSujet = new forumShema({
            Title: Forum_title,
            Slug: Slug,
            Sujet: Sujet,
            FormattedDate: dateReformated,
            User: decode.userId,
        })
        nouveauSujet.save()
            .then(() => res.status(201).json({ message: "Noveau sujet ajouter avec succès", idSujet : nouveauSujet._id }))
            .then(() => console.log(nouveauSujet._id))
            .catch(e => res.status(500).json({ message: e }))
    }
}



exports.findSujet = (req, res, next) => {
    const forum = forumShema.find()
        .populate('User')
        .then(forumPost => res.status(200).json(forumPost))
        .catch(e => res.status(500).json({ message: "Une erreur interne est survenu" }))
}


exports.findSujetById = (req, res, next) => {
    forum.findById({ _id: req.params.id })
        .then(forum => res.status(200).json(forum))
        .catch(e => res.status(400).json(e))
}