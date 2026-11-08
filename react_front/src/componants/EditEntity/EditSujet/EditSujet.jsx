import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from '../../Spinner/Spinner';
import Toast_validation from '../../Toast_valide/Toast_valide';
import Toast_invalide from '../../Toast_invalide/Toast_invalide';
import ArticleForm from '../../ArticleForm/ArticleForm';
import { apiErrorMessage } from '../../ArticleForm/articleRules';

// Modification d'un article (route /editSujet/:id, lien "Modifié" du tableau des articles)
export const EditSujet = () => {
    const [article, setArticle] = useState(null)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    useEffect(() => {
        const getArticleById = async () => {
            setIsLoading(true)
            try {
                const request = await fetch(`${apiUrl}/article/article/${id}`, { method: "GET" })
                const response = await request.json()
                if (request.ok && response) {
                    setArticle(response)
                } else {
                    setErrorMessage("Article introuvable")
                }
            }
            catch (err) {
                console.log(err)
                setErrorMessage("Une erreur est survenu lors du chargement de l'article")
            }
            finally {
                setIsLoading(false)
            }
        }
        getArticleById()
    }, [id])

    const editArticle = async (formData) => {
        setIsSubmitting(true)
        setErrorMessage(null)
        try {
            const request = await fetch(`${apiUrl}/article/editArticle/${id}`, {
                method: "PUT",
                body: formData,
                headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` }
            });
            const response = await request.json();

            if (request.status === 200) {
                setMessage(`${response.message}. Que voulez-vous faire ?`);
            } else {
                setErrorMessage(apiErrorMessage(response, "Une erreur lors de la modification de l'article est survenue"));
            }
        } catch (err) {
            console.log(err)
            setErrorMessage("Une erreur inconnue est survenue")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className='min-h-screen'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Space Explorer | Modifier Article sur ${article?.Title ?? ''}`}</title>
                <meta name="description" content="Space Explorer est un site sur l'astronomie et l'espace, découvrez des articles passionnant et des images magnifiques d'étoiles et de planète." />
            </Helmet>
            {isLoading ?
                (<Spinner />) : (
                    <>
                        <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'> Modification de l'article : {article?.Title}</h1>
                        {
                            message &&
                            <Toast_validation
                                message={message}
                                options={true}
                                doYesAction={() => navigate("/dashBoard", { state: { blockSection: "Articles" } })}
                                doNoAction={() => navigate(`/article/${id}`)}
                                choice1="Revenir au dashboard"
                                choice2="Voir l'article modifier"
                            />
                        }
                        {
                            errorMessage &&
                            <Toast_invalide message={errorMessage} deletePopUp={() => setErrorMessage(null)} />
                        }
                        {article &&
                            <ArticleForm
                                article={article}
                                onSubmit={editArticle}
                                submitLabel="Enregistrer les modifications"
                                isSubmitting={isSubmitting}
                            />
                        }
                    </>
                )}
        </section >
    )
}
