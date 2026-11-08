import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RichTextEditor from '../RichTextEditor/RichTextEditor'
import { stripHtml } from '../../Functions/TextRendering/stripHtml'
import {
    ACCEPTED_IMAGE_TYPES,
    ARTICLE_SLUGS,
    MAX_ARTICLE_LENGTH,
    MAX_IMAGE_SIZE,
    MAX_TITLE_LENGTH,
    MIN_ARTICLE_LENGTH,
    MIN_TITLE_LENGTH,
} from './articleRules'

const LABEL_CLASS = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
const INPUT_CLASS = 'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
const ERROR_CLASS = 'font-bold text-red-500 text-sm md:text-md mt-2'

const validateTitle = (value) => {
    const length = value.trim().length
    if (length === 0) return 'Veuillez remplir ce champs avec un Titre'
    return (length >= MIN_TITLE_LENGTH && length <= MAX_TITLE_LENGTH) ||
        `Veuillez taper un titre qui contient ${MIN_TITLE_LENGTH} à ${MAX_TITLE_LENGTH} caractères`
}

const validateContent = (html) => {
    const length = stripHtml(html).length
    return (length >= MIN_ARTICLE_LENGTH && length <= MAX_ARTICLE_LENGTH) ||
        `Veuillez écrire un article de ${MIN_ARTICLE_LENGTH} à ${MAX_ARTICLE_LENGTH} caractères`
}

// Formulaire d'article, commun à la création et à la modification :
// un titre, un slug (une seule catégorie), une image représentant l'article et le corps rédigé avec CKEditor.
// Sans `article` (création) l'image est obligatoire ; en modification elle est facultative et l'actuelle est conservée.
// `onSubmit` reçoit un FormData : titre, slug, contenu et éventuellement image.
export default function ArticleForm({ article, onSubmit, submitLabel, isSubmitting = false }) {
    const apiUrl = import.meta.env.VITE_API_URL
    const isEdit = Boolean(article)

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitted } } = useForm({
        criteriaMode: 'all',
        defaultValues: {
            titre: article?.Title ?? '',
            slug: article?.Slug ?? '',
            contenu: article?.Contenu ?? '',
        },
    })

    // Le contenu vient de CKEditor (non contrôlé) : champ enregistré sans élément DOM
    useEffect(() => {
        register('contenu', { validate: validateContent })
    }, [register])

    const validateImage = (files) => {
        const file = files?.[0]
        if (!file) return isEdit || "Veuillez ajouter une image représentant l'article"
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return "Nous n'acceptons que les images de type PNG, JPEG, JPG ou Webp"
        if (file.size > MAX_IMAGE_SIZE) return `L'image ne doit pas dépasser ${MAX_IMAGE_SIZE / (1024 * 1024)} Mo`
        return true
    }

    const contenu = watch('contenu')
    const selectedImage = watch('image')?.[0]

    // Aperçu de l'image choisie, sinon de l'image actuelle de l'article
    const [previewUrl, setPreviewUrl] = useState(null)
    useEffect(() => {
        if (!selectedImage || typeof URL.createObjectURL !== 'function') {
            setPreviewUrl(null)
            return undefined
        }
        const url = URL.createObjectURL(selectedImage)
        setPreviewUrl(url)
        return () => URL.revokeObjectURL(url)
    }, [selectedImage])
    const imageSrc = previewUrl || (article?.Image ? `${apiUrl}/${encodeURIComponent(article.Image)}` : null)

    const submit = (values) => {
        const formData = new FormData()
        formData.append('titre', values.titre.trim())
        formData.append('slug', values.slug)
        formData.append('contenu', values.contenu)
        if (values.image?.[0]) {
            formData.append('image', values.image[0])
        }
        return onSubmit(formData)
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            noValidate
            className="w-[280px] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg p-4 mx-auto"
        >
            <div className="mb-6">
                <label htmlFor="article-titre" className={LABEL_CLASS}>Titre</label>
                <input
                    id="article-titre"
                    type="text"
                    placeholder="Titre de l'article"
                    className={INPUT_CLASS}
                    {...register('titre', { validate: validateTitle })}
                />
                {errors.titre && <p className={ERROR_CLASS}>{errors.titre.message}</p>}
            </div>

            <fieldset className="mb-6">
                <legend className={LABEL_CLASS}>Slug</legend>
                <p className="text-sm md:text-md dark:text-white mb-2">Choisissez la catégorie de l'article</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                    {ARTICLE_SLUGS.map(({ value, label }) => (
                        <label key={value} className="text-sm md:text-md dark:text-white flex items-center gap-2">
                            <input
                                type="radio"
                                value={value}
                                {...register('slug', { required: "Veuillez choisir une catégorie pour l'article" })}
                            />
                            {label}
                        </label>
                    ))}
                </div>
                {errors.slug && <p className={ERROR_CLASS}>{errors.slug.message}</p>}
            </fieldset>

            <div className="mb-6">
                <label htmlFor="article-image" className={LABEL_CLASS}>Image représentant l'article</label>
                {imageSrc &&
                    <img src={imageSrc} alt="Aperçu de l'image de l'article" className="mb-3 w-full max-h-64 object-cover rounded-lg" />
                }
                <input
                    id="article-image"
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    className="dark:text-white text-sm md:text-base"
                    {...register('image', { validate: validateImage })}
                />
                {isEdit &&
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Laissez vide pour garder l'image actuelle</p>
                }
                {errors.image && <p className={ERROR_CLASS}>{errors.image.message}</p>}
            </div>

            <div className="mb-6">
                <p className={LABEL_CLASS}>Contenu de l'article</p>
                <RichTextEditor
                    initData={article?.Contenu ?? ''}
                    onChange={(html) => setValue('contenu', html, { shouldValidate: isSubmitted })}
                />
                <p className="dark:text-white text-sm md:text-md ml-1 mt-2">
                    {stripHtml(contenu).length} / {MAX_ARTICLE_LENGTH}
                </p>
                {errors.contenu && <p className={ERROR_CLASS}>{errors.contenu.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {submitLabel}
            </button>
        </form>
    )
}
