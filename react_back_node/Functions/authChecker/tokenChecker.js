const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const User = require('../../Model/userShema');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (token) {
            const decodedToken = jwt.verify(token, 'HS256', function (err, decoded) {
                if (err) {
                    res.status(401).json(
                        err = {
                            name: "Tokken Invalide",
                            message: "Veuillez vous reconnecter"
                        }
                    )
                }
                req.user = decoded
                next()

            });

        } else {
            return res.status(401).json("message : Veuillez vous connecter");
        }
    } catch (error) {
        return res.status(401).json();
    }
};