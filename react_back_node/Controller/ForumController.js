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
            return res.status(403).json({ message: "Veuillez vous connecter afin de pouvoir poster un nouveau sujet" })
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
        const nouveauSujet = new forumShema({
            Title: Forum_title,
            Slug: Slug,
            Sujet: Sujet,
            FormattedDate: dateReformated,
            User: decode.userId,
        })
        nouveauSujet.save()
            .then(() => res.status(201).json({ message: "Nouveau sujet ajouter avec succès, revenir à la liste des sujet ou aller sur votre sujet ? ", idSujet: nouveauSujet._id }))
            .then(() => console.log(nouveauSujet._id))
            .catch(e => res.status(500).json({ message: e }))
    }
}

exports.deleteSujet = (req, res, next) => {
    console.log("La route de supression d'article")

    try {
        const tokken = req.headers.authorization;
        const tokkenSplited = tokken.split(' ')[1]
        if (!tokkenSplited) { return res.status(401).json({ message: "Une erreur interne c'est produite veuillez ressayer" }) }

        const sujetId = req.params.id
        forumShema.find()
            .then(forum => {
                try {
                    const allForum = forum

                    const result = allForum.filter((uniqueForum) => uniqueForum._id.toString() === req.params.id)

                    console.log(result)

                    if (result.length === 0) {
                        return res.status(200).json({ message: "Aucun sujet correspondant retrouvé" })
                    }
                    else {
                        forumShema.deleteOne({ "_id": sujetId })
                            .then(() => {
                                return res.status(200).json({ message: `Le sujet à bien était supprimé` })
                            })
                            .catch((err) => {
                                return res.status(500).json({ message: "Impossible de supprimer le sujet" });
                            })
                    }


                } catch (error) {
                    console.log(error)
                }

            })
            .catch((e) => {
                console.log(e)

                return res.status(500).json({ message: "Impossible de supprimer le Sujet " })
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Impossible d'éffectuer l'action" })
    }

}

exports.editSujet = (req, res, next) => {
    console.log("Hello Edit Sujet Router")
}


exports.findSujet = (req, res, next) => {
    const forum = forumShema.find()
        .populate('User')
        .then(forumPost => res.status(200).json(forumPost))
        .catch(e => res.status(500).json({ message: "Une erreur interne est survenu" }))
}

exports.findSujetById = (req, res, next) => {
    const forums = forumShema.findById({ _id: req.params.id })
        .populate("User")
        .then(forum => res.status(200).json(forum))
        .catch(e => res.status(400).json(e))
}

exports.addReponse = async (req, res, next) => {

    const tokken = req.headers.authorization;
    const tokkenSplited = tokken.split(' ')[1]

    if (!tokkenSplited) { return res.status(401).json({ message: "Une erreur interne c'est produite veuillez ressayer" }) }
    const decode = jwt.verify(tokkenSplited, "RANDOM_TOKEN_SECRET", function (err, decoded) {
        if (err) {
            return res.status(403).json({ message: "Veuillez vous connecter afin de pouvoir poster un nouveau sujet" })
        } else {
            return decoded
        }
    })

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    else {
        try {
            const { user, response_content } = req.body
            let date = new Date();
            const dateReformated = formatDateToDDMMYYYY(date);

            const newResponse = {
                content: response_content,
                user: user,
                FormattedDate: dateReformated,
            };

            const forum = await forumShema.findById({ _id: req.params.id })
            forum.Reponses.push(newResponse)
            await forum.save()
            return res.status((201)).json({ message: "Message envoyé avec success" })
        } catch (error) {
            console.log(error)
            return res.status(500).json("Une erreur interne est survenu")
        }
    }
}