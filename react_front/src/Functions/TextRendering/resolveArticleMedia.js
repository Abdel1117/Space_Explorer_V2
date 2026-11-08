// Les images insérées via CKEditor sont enregistrées avec un chemin relatif à l'API
// (ex : /article_contenu/saturne_1718000000000.png). Pour l'affichage, on le préfixe par l'URL de l'API.
// Les URL absolues (http:, https:, data:, //...) et les liens <a> ne sont pas modifiés.
const ABSOLUTE_URL = /^([a-z][a-z0-9+.-]*:|\/\/)/i

export const resolveArticleMedia = (html, apiUrl) => {
    if (!html) return ''
    if (typeof document === 'undefined') return html

    // <template> : le HTML est analysé sans être actif, les images ne sont pas chargées avec la mauvaise URL
    const template = document.createElement('template')
    template.innerHTML = html

    template.content.querySelectorAll('img[src], source[src]').forEach((node) => {
        const src = node.getAttribute('src')
        if (!src || ABSOLUTE_URL.test(src)) return
        node.setAttribute('src', `${apiUrl}${src.startsWith('/') ? '' : '/'}${src}`)
    })

    return template.innerHTML
}
