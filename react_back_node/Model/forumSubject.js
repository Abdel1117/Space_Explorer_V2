const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ReponseShema = mongoose.Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const SujetForumShema = mongoose.Schema({

    Title: { type: String, required: true },
    Slug: { type: String, required: true },
    Sujet: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Reponses: [ReponseShema]
});



const SujetForum = mongoose.model("SujetForum", SujetForumShema);
module.exports = SujetForum