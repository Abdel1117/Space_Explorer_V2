require("dotenv").config()
const User = require('../Model/userShema');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fs = require("fs")
const AUTH_TOKKEN_CODE = process.env.AUTH_TOKKEN_CODE
const REFRESH_TOKKEN_CODE = process.env.REFRESH_TOKKEN_CODE


exports.inscriptionHandler = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        /* If error is appening in the body vlidation message are sent */
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        /* Crypting passowrd */
        bcrypt.hash(req.body.passwordInput, 10)
            .then(hash => {
                const user = new User({
                    pseudo: req.body.pseudo,
                    email: req.body.emailInput,
                    password: hash
                });
                user.save()
                    .then(() => { res.status(201).json({ message: "Utilisateur crée" }) })
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(err => res.status(500).json({ err }));
    }
}


exports.connexionHandler = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const email = req.body.emailInput;
        const password = req.body.passwordInput;
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ errors: "Paire login / Mot de passe incorect" });
                }
                bcrypt.compare(password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ errors: "Paire login / Mot de passe incorect" })
                        }
                        const token = jwt.sign(
                            {
                                userId: user._id,
                                userRole: user.role
                            },
                            AUTH_TOKKEN_CODE,
                            { expiresIn: "2h" }

                        )
                        const refreshToken = jwt.sign(
                            {
                                userId: user._id,
                                userRole: user.role
                            },
                            REFRESH_TOKKEN_CODE,
                            { expiresIn: "2h" },
                        )
                        user.refreshToken = refreshToken;
                        user.save()
                            .then(updatedUser => {
                                if (updatedUser) {

                                    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

                                    res.status(200).json({
                                        userId: user._id,
                                        userRole: user.role,
                                        token,
                                        message: "Connexion réussi vous aller être rediriger"
                                    })
                                }
                                else {
                                    res.status(500).json({ erreur: "Une erreur inconnue est survenue" })
                                };
                            })

                    })
                    .catch(err => console.log(err));
            })
            .catch(err => res.status(500).json({ erreur: "Une erreur inconne est survenue" }))
    };
}

exports.deleteUser = (req, res, next) => {

    try {
        const tokken = req.headers.authorization;
        const tokkenSplited = tokken.split(' ')[1]
        if (!tokkenSplited) { return res.status(401).json({ message: "Une erreur interne c'est produite veuillez ressayer" }) }

        const userId = req.params.id
        User.find()
            .then(user => {
                try {
                    const allUser = user

                    const result = allUser.filter((uniqueUser) => uniqueUser._id.toString() === req.params.id)


                    if (result.length === 0) {
                        return res.status(200).json({ message: "Aucune user correspondant retrouvé" })
                    }
                    else {
                        User.deleteOne({ "_id": userId })
                            .then(() => {
                                return res.status(200).json({ message: `L'user à bien était supprimé` })
                            })
                            .catch((err) => {
                                console.log(err)
                                return res.status(500).json({ message: "Impossible de supprimer l'user" });
                            })
                    }
                } catch (error) {
                    console.log(error)
                }
            })
            .catch((e) => {
                console.log(e)
                return res.status(500).json({ message: "Impossible de supprimer l'user " })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Impossible d'éffectuer l'action" })
    }
}


exports.editUser = async (req, res, next) => {

    console.log("Edit User Route")
    const authorization = req.headers.authorization;
    console.log(authorization)

    try {
        const id = req.params.id
        const userFind = User.findById(req.params.id)
        if (userFind) {

            const updatedUser = req.body
            console.log(updatedUser)
            await User.findByIdAndUpdate(id, updatedUser, { new: true })
            return res.status(200).json({ message: "Changement Effectuer" })
        } else {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Une erreur est survenu" })
    }

}

exports.editAvatar = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    const userFind = User.findById(req.params.id)
    if (userFind) {
        const newImage = req.file
        const newImagePath = newImage.filename
        console.log(newImagePath)
        if (newImage) {
            // Supprimer l'ancien avatar de l'utilisateur 
            const currentAvatar = await User.findById(req.params.id)
            console.log("=============================")
            console.log(currentAvatar)
            console.log("=============================")
            if (currentAvatar.avatar) {
                await new Promise((resolve, reject) => {
                    const fullPath = `./image/avatar/${currentAvatar.avatar}`
                    fs.unlink(fullPath, err => {
                        if (err) {
                            console.error("Erreur lors de la suppression de l'ancien fichier image", err);
                            reject(err);
                        }
                        resolve();
                    });
                });
                const newCollection = await User.findByIdAndUpdate(id, { avatar: newImage.filename }, { new: true })
                console.log(newCollection)

            } else {
                console.log("qisdjiqsjd")

                const newCollection = await User.findByIdAndUpdate(id, { avatar: newImage.filename }, { new: true })
                console.log(newCollection)
                console.log("======================")

            }
            return res.status(200).json({ message: "Changement d'avatar effectué" })
        }

    } else {
        return res.status(404).json({ message: "Aucun utilisateur trouvé" })
    }
}
exports.getInfo = (req, res, next) => {
    User.findById({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(409).json(err))
}


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '_id email role'); // Utilisez la méthode `find` avec `select` pour spécifier les champs à inclure/exclure.
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
};