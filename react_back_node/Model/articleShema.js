const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  Title: { type: String, required: true },
  // Une seule catégorie par article (cf. ARTICLE_SLUGS dans ValidationArticle.js)
  Slug: { type: String, required: true },
  // Image représentant l'article : nom du fichier dans image/Image_article
  // (haut de la page article, Hero et cartes de l'accueil)
  Image: { type: String, required: true },
  // Corps de l'article : HTML produit par CKEditor et nettoyé par sanitizeArticleHtml
  Contenu: { type: String, required: true }
}, { timestamps: true })

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
