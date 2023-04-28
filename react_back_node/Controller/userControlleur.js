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
                        res.status(200).json({
                            userId: user._id,
                            userRole: user.role,
                            message: "Connexion réussi vous aller être rediriger",
                            token: jwt.sign(
                                {
                                    userId: user._id,
                                    userRole: user.role
                                },
                                "RANDOM_TOKEN_SECRET",
                                { expiresIn: "1d" }

                            ),
                            refreshToken: jwt.sign(
                                {
                                    userId: user._id,
                                    userRole: user.role


                                },
                                "RANDOM_TOKEN_SECRET_REFRESH",
                                { expiresIn: "3h" },
                            )
                        });
                    })
                    .catch(err => console.log(err));
            })

            .catch(err => res.status(500).json({ err }))

    };
}

exports.getInfo = (req, res, next) => {
    User.findById({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(409).json(err))

}