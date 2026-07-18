const sanitizeHtml = require("sanitize-html");

const ARTICLE_HTML_OPTIONS = {
    allowedTags: ["p", "br", "strong", "em", "u", "s", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "a"],
    allowedAttributes: {
        a: ["href", "target", "rel"]
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" })
    }
};

const sanitizeArticleHtml = (html) => sanitizeHtml(html || "", ARTICLE_HTML_OPTIONS);

const stripHtml = (html) => sanitizeHtml(html || "", { allowedTags: [], allowedAttributes: {} }).trim();

module.exports = { sanitizeArticleHtml, stripHtml };
