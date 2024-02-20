const User = require('../Model/userShema');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const AUTH_TOKKEN_CODE = process.env.AUTH_TOKKEN_CODE
const REFRESH_TOKKEN_CODE = process.env.REFRESH_TOKKEN_CODE

exports.handleRefreshToken = async (req, res, next) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);


    const refreshToken = cookies.jwt;

    const allUser = await User.find();

    const actualUser = allUser.filter(person => person.refreshToken == refreshToken);

    if (!actualUser) return res.sendStatus(403); //Forbidden

    /* And after we evaluate the jwt */
    jwt.verify(
        refreshToken,
        REFRESH_TOKKEN_CODE,
        (err, decoded) => {
            if (err || actualUser.email !== decoded.email) {

                /* We need to clear the Cookie here  */
                return res.clearCookie("jwt").sendStatus(403); //Forbidden
            }

            const accessToken = jwt.sign(
                {
                    userId: decoded.userId,
                    userRole: decoded.userRole
                },
                AUTH_TOKKEN_CODE,
                { expiresIn: "30min" }
            )
            res.json({
                "userId": decoded.userId,
                "userRole": decoded.userRole,
                accessToken
            })
        }

    )

}
