const mongoose = require("mongoose")

const imageShema = mongoose.Schema({
    image: { type: String, required: true },
    Slugs: { type: Array, required: true },
    imageDesc: { type: String, required: true }
})



const Image = mongoose.model("Image", imageShema);


module.exports = Image;