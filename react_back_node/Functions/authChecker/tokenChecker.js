const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const User = require('../../Model/userShema');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        const token2 = token.split(' ')[1];

        const refreshToken = req.headers.refreshtoken;

        if (token) {
            const decodedToken = jwt.verify(token2, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        console.log('Token Expirer');
                        const refreshToken = req.cookies
                        console.log(refreshToken);
                        next()
                        /*  return res.status(401).json({
                             erreur: {
                                 name: "Token Expirer",
                                 message: "Veuillez vous reconnecter"
                             }
                         }) */
                    } else if (jwt.JsonWebTokenError) {
                        console.log('Token Invalide');
                        return res.status(401).json({
                            erreur: {
                                name: "Token Invalide",
                                message: "Veuillez vous reconnecter"
                            }
                        })
                    }
                } else {
                    console.log('Token Valide');
                    req.user = decoded
                    console.log(req.user)
                    res.status(200).json({
                        userId: decoded.userId,
                        userRole: decoded.userRole,
                        token: token,
                        refreshToken: refreshToken
                    })
                    next()
                }
            });
        } else {
            console.log(' Veuillez vous connecter');
            return res.status(401).json("message : Veuillez vous connecter");
        }
    } catch (error) {
        return res.status(401).json();
    }
};