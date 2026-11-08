// Configuration CKEditor 4 des sections d'article : du texte et des images façon Wikipédia
// (image seule ou figure avec légende, alignée à gauche / au centre / à droite, le texte l'entoure).
//
// Les classes d'image doivent rester synchronisées avec :
//  - le sanitizer du back : react_back_node/Functions/Sanitize/sanitizeArticleHtml.js
//  - les styles .article-content de la page article : src/index.css
export const IMAGE_ALIGN_CLASSES = ['image-align-left', 'image-align-center', 'image-align-right']
export const IMAGE_CAPTIONED_CLASS = 'image-captioned'

const TOOLBAR = [
    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Blockquote'] },
    { name: 'links', items: ['Link', 'Unlink'] },
    { name: 'insert', items: ['Image'] },
    { name: 'styles', items: ['Format'] },
    { name: 'undo', items: ['Undo', 'Redo'] },
]

// Filtre de contenu de l'éditeur (ACF) : même liste de balises que le sanitizer du back.
// data-widget est nécessaire à uploadimage pour reconnaître l'image en cours d'envoi
// (il n'apparaît pas dans le HTML final).
const ALLOWED_CONTENT = [
    'p br strong em u s h2 h3 h4 ul ol li blockquote figcaption',
    'a[!href,target]',
    `img[!src,alt,width,height,data-widget](${IMAGE_ALIGN_CLASSES.join(',')})`,
    `figure(${[IMAGE_CAPTIONED_CLASS, ...IMAGE_ALIGN_CLASSES].join(',')})`,
    'p(image-align-center)',
].join('; ')

// Mise en page des images dans la zone d'édition (iframe CKEditor), proche du rendu de la page article.
// Dans l'éditeur, image2 pose la classe d'alignement sur l'enveloppe du widget.
export const EDITOR_CONTENT_CSS = `
img { max-width: 100%; height: auto; }
.image-align-left { float: left; max-width: 50%; margin: 0.25em 1.5em 1em 0; }
.image-align-right { float: right; max-width: 50%; margin: 0.25em 0 1em 1.5em; }
.image-align-center { text-align: center; }
`

export const buildEditorConfig = (apiUrl) => {
    const uploadUrl = `${apiUrl}/article/uploadImage`

    return {
        toolbar: TOOLBAR,
        format_tags: 'p;h2;h3;h4',
        // image2 : légende et alignement des images ; uploadimage : glisser-déposer ou coller une image
        extraPlugins: 'image2,uploadimage',
        // "image" est remplacé par image2 ; easyimage entre en conflit avec uploadimage
        removePlugins: 'image,easyimage,elementspath',
        allowedContent: ALLOWED_CONTENT,
        image2_alignClasses: IMAGE_ALIGN_CLASSES,
        image2_captionedClass: IMAGE_CAPTIONED_CLASS,
        // Glisser-déposer et collage, limités aux formats acceptés par le back
        imageUploadUrl: uploadUrl,
        uploadImage_supportedTypes: /image\/(jpeg|png|webp)/,
        // Onglet "Téléverser" de la boîte de dialogue Image, en XHR pour recevoir du JSON
        // et pouvoir ajouter l'en-tête Authorization (cf. addUploadAuthHeader)
        filebrowserImageUploadUrl: uploadUrl,
        filebrowserUploadMethod: 'xhr',
        // Le back renvoie un chemin relatif à l'API (/article_contenu/...) : l'éditeur le résout depuis l'API
        baseHref: `${apiUrl}/`,
        resize_enabled: false,
    }
}

// Écouteur "fileUploadRequest" : ajoute le token de l'administrateur aux uploads de CKEditor.
// Il s'exécute après l'ouverture de la requête et avant son envoi.
export const addUploadAuthHeader = (evt) => {
    const token = sessionStorage.getItem('token')
    if (token) {
        evt.data.fileLoader.xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    }
}

// À appeler une seule fois, quand le namespace CKEDITOR est chargé
export const registerEditorStyles = (CKEDITOR) => {
    CKEDITOR.addCss(EDITOR_CONTENT_CSS)
}
