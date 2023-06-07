const mongoose = require('mongoose');

const ContenuSchema = mongoose.Schema({
  titre: { type: String, required: true },
  contenu: { type: String, required: true },
  image: { type: String, required: true }

});

const ArticleSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Slugs: { type: Array, required: true },
  Contenu: [{
    type: ContenuSchema, required: true
  }]
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;