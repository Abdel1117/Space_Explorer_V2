const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const User = require('../../Model/userShema');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
       
        const decodedToken = jwt.verify(token, ('RANDOM_TOKEN_SECRET'))
       
        const result = User.findById(decodedToken.userId)
        .then((user,err)=>{
            if(!user){
                console.log("pas auth")
            }else{
                console.log(user._id)
                return res.status(200).json({
                    userId : user._id,
                    tokken : token,
                })
            }

    }).catch(err => console.log(err))
    }catch(error){
        console.log(error)
    }
}
