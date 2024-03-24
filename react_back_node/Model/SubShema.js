const mongoose = require("mongoose")

const subShema = mongoose.Schema({
    email: { type: String, required: true },
   
})



const subShemaModel = mongoose.model("subShema", subShema);


module.exports = subShemaModel;