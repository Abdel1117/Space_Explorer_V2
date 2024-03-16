const Article = require("../Model/articleShema");
const Image = require("../Model/imageShema");
const User = require('../Model/userShema');
const mongoose = require("mongoose")
exports.getAllEntityCount = async (req, res, next) => {

    try {
        const bodyResponse = {
            "Articles": 0,
            "Images": 0,
            "Users": 0,
        }

        const articleCount = await Article.count();
        const imageCount = await Image.count()
        const userCount = await User.count();
        bodyResponse.Articles = articleCount
        bodyResponse.Images = imageCount
        bodyResponse.Users = userCount

        return res.status(200).json(bodyResponse)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Une erreur inconnue est survenu" })
    }

}