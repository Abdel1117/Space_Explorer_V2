const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    console.log("oqskdfqopdksqpoké");
    console.log(authHeader)
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        console.log(token);
        console.log("2")

        jwt.verify(token, "RANDOM_TOKEN_SECRET" , (err, user ) => {
            if(err) {
                console.log("3")
                return res.status(403).json("Votre clefs n'est pas valide")
            }

            req.user = user 
            next()
        } );
    }else{
        console.log("4")
        res.status(401).json("Vous n'êtes pas authentifier")
    }
}