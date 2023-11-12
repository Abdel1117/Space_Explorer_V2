const User = require('../Model/userShema');
const jwt = require('jsonwebtoken');

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
        "RANDOM_TOKEN_SECRET_REFRESH",
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
                "RANDOM_TOKEN_SECRET",
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
