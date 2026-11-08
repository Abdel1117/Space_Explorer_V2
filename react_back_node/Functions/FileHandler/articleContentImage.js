const fs = require("fs");
const path = require("path");
const sanitizeHtml = require("sanitize-html");
const upload = require("./imagHandler");

// Images insérées dans le corps des articles depuis CKEditor (bouton Image, glisser-déposer, collage).
// Elles sont stockées dans image/article_contenu et servies sur /article_contenu/<fichier>.
// Le HTML des articles garde ce chemin relatif ; le front le préfixe par l'URL de l'API à l'affichage.
const CONTENT_IMAGE_FOLDER = "article_contenu";
const CONTENT_IMAGE_ROUTE = `/${CONTENT_IMAGE_FOLDER}`;
const CONTENT_IMAGE_DIR = path.join(__dirname, "..", "..", "image", CONTENT_IMAGE_FOLDER);
const MAX_CONTENT_IMAGE_SIZE = 5 * 1024 * 1024;

// CKEditor 4 envoie le fichier dans le champ "upload"
const uploadContentImage = upload(CONTENT_IMAGE_FOLDER, {
    limits: { fileSize: MAX_CONTENT_IMAGE_SIZE, files: 1 }
}).single("upload");

const contentImageUrl = (filename) => `${CONTENT_IMAGE_ROUTE}/${encodeURIComponent(filename)}`;

// Liste les fichiers de image/article_contenu référencés par les <img> d'un HTML d'article.
// Seuls les chemins relatifs produits par l'upload sont pris en compte : une URL absolue
// (image externe) n'est jamais associée à un fichier local.
const extractContentImageFiles = (html) => {
    const files = new Set();
    const prefix = `${CONTENT_IMAGE_ROUTE}/`;

    sanitizeHtml(html || "", {
        allowedTags: ["img"],
        allowedAttributes: { img: ["src"] },
        transformTags: {
            img: (tagName, attribs) => {
                const src = attribs.src || "";
                if (src.startsWith(prefix)) {
                    try {
                        const filename = path.basename(decodeURIComponent(src.slice(prefix.length).split(/[?#]/)[0]));
                        if (filename && filename !== "." && filename !== "..") {
                            files.add(filename);
                        }
                    } catch (err) {
                        // URI mal formée : ce n'est pas un fichier produit par l'upload
                    }
                }
                return { tagName, attribs };
            }
        }
    });

    return [...files];
};

// Supprime des images du corps d'article devenues inutiles. Une erreur ne bloque pas la requête.
const removeContentImages = (filenames) => {
    filenames.forEach((filename) => {
        fs.unlink(path.join(CONTENT_IMAGE_DIR, filename), (err) => {
            if (err && err.code !== "ENOENT") {
                console.error(err);
            }
        });
    });
};

module.exports = {
    CONTENT_IMAGE_DIR,
    CONTENT_IMAGE_ROUTE,
    MAX_CONTENT_IMAGE_SIZE,
    uploadContentImage,
    contentImageUrl,
    extractContentImageFiles,
    removeContentImages
};
