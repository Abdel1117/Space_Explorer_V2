const User = require('../Model/userShema');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.inscriptionHandler = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    else {

        bcrypt.hash(req.body.passwordInput, 10)
            .then(hash => {
                const user = new User({
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
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "50min" }

                        )
                        const refreshToken = jwt.sign(
                            {
                                userId: user._id,
                                userRole: user.role
                            },
                            "RANDOM_TOKEN_SECRET_REFRESH",
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