// Règles d'un article, à garder synchronisées avec
// react_back_node/Functions/RegexFunction/ValidationArticle.js et Functions/FileHandler/articleImage.js
export const ARTICLE_SLUGS = [
    { value: 'Planète', label: 'Planète' },
    { value: 'Systeme Solaire', label: 'Système Solaire' },
    { value: 'Objet Stélaire', label: 'Objet Stélaire' },
    { value: 'Etoile', label: 'Etoile' },
    { value: 'Météorite', label: 'Météorite' },
]

export const MIN_TITLE_LENGTH = 3
export const MAX_TITLE_LENGTH = 50
export const MIN_ARTICLE_LENGTH = 400
export const MAX_ARTICLE_LENGTH = 20000
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024

// Premier message d'erreur renvoyé par l'API (erreurs express-validator ou message simple)
export const apiErrorMessage = (data, fallback = 'Une erreur est survenue') =>
    data?.errors?.[0]?.msg || data?.message || fallback
