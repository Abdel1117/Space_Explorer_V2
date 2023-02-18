const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const User = require('../../Model/userShema');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const refreshToken = req.headers.refreshtoken;
        if (token) {
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        console.log('ICI 1');
                        return res.status(401).json({
                            erreur: {
                                name: "Token Expirer",
                                message: "Veuillez vous reconnecter"
                            }
                        });
                    } else {
                        console.log('ICI 2');
                        return res.status(401).json({
                            erreur: {
                                name: "Token Invalide",
                                message: "Veuillez vous reconnecter"
                            }
                        })
                    }
                } else {
                    console.log('ICI 3');
                    req.user = decoded
                    res.status(200).json({
                        userId: decoded.userId,
                        message: "Authentification réussi",
                        token: token,
                        refreshToken: refreshToken
                    })
                    next()
                }
            });

        } else {
            console.log('ICI 4');
            return res.status(401).json("message : Veuillez vous connecter");
        }
    } catch (error) {
        return res.status(401).json();
    }
};