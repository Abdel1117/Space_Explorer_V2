const { all } = require('..');
const User = require('../Model/userShema');
const jwt = require('jsonwebtoken');

exports.handleRefreshToken = async (req, res, next) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;

    const allUser = await User.find();

    const actualUser = allUser.filter(person => person.refreshToken == refreshToken);

    if (!actualUser) return res.sendStatus(403); //Forbidden

    /* And after we evaluate the jwt */
    jwt.verify(
        refreshToken,
        "RANDOM_TOKEN_SECRET_REFRESH",
        (err, decoded) => {
            if (err || actualUser.email !== decoded.email)
                return res.sendStatus(403) //Forbidden

            console.log(decoded)
            const accessToken = jwt.sign(
                {
                    userId: decoded.userId,
                    userRole: decoded.userRole
                },
                "RANDOM_TOKEN_SECRET",
                { expiresIn: "30s" }
            )
            res.json({ accessToken })
        }

    )

}
