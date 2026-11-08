const sanitizeHtml = require("sanitize-html");

// Classes posées par le plugin image2 de CKEditor (image2_alignClasses / image2_captionedClass).
// À garder synchronisées avec react_front/src/componants/RichTextEditor/editorConfig.js et index.css.
const IMAGE_ALIGN_CLASSES = ["image-align-left", "image-align-center", "image-align-right"];
const IMAGE_CAPTIONED_CLASS = "image-captioned";

const ARTICLE_HTML_OPTIONS = {
    allowedTags: [
        "p", "br", "strong", "em", "u", "s", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "a",
        // Images façon Wikipédia : image seule ou figure avec légende, alignée à gauche / au centre / à droite
        "img", "figure", "figcaption"
    ],
    allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height"]
    },
    // Seules ces classes sont conservées, toute autre classe est retirée
    allowedClasses: {
        img: IMAGE_ALIGN_CLASSES,
        figure: [IMAGE_CAPTIONED_CLASS, ...IMAGE_ALIGN_CLASSES],
        // image2 centre une image sans légende en l'entourant d'un <p class="image-align-center">
        p: ["image-align-center"]
    },
    // Pas de data: ni de javascript: dans les images (les chemins relatifs restent autorisés)
    allowedSchemesByTag: {
        img: ["http", "https"]
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" })
    }
};

const sanitizeArticleHtml = (html) => sanitizeHtml(html || "", ARTICLE_HTML_OPTIONS);

const stripHtml = (html) => sanitizeHtml(html || "", { allowedTags: [], allowedAttributes: {} }).trim();

module.exports = { sanitizeArticleHtml, stripHtml };
