/*
const mongoose = require("mongoose");

const user = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "Utilisateur" }
});
 
 
module.exports = mongoose.model('User', user);
*/

const mongoose = require('mongoose');

const Article = mongoose.Schema({
  Title: { type: String, required: true },
  Slugs: { type: Array, required: true },
  Contenu: { type: Object, required: true },

})

module.exports = mongoose.model('Article', Article)