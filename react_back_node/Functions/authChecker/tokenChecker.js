const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const User = require('../../Model/userShema');


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            const user = await User.findById(decodedToken.userId);
            if (!user) {
                return res.status(401).json({ message: "Vous n'êtes pas connecté" });
            }

            


            req.user = { userId: user._id, token };
            next();
        } else {
            return res.status(401).json({ message: "Vous n'êtes pas connecté" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Vous n'êtes pas connecté" });
    }
};