import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import userContext from '../../Context/userContext';
import { BouttonBackWard } from '../../componants/BouttonBackWard/BouttonBackWard';
import { Spinner } from '../../componants/Spinner/Spinner';
import { resolveArticleMedia } from '../../Functions/TextRendering/resolveArticleMedia';

export default function Article() {
    const { userAuth } = useContext(userContext);
    const articleId = useParams()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)
    const [article, setArticle] = useState(null)

    useEffect(() => {
        const getArticle = async () => {
            try {
                setLoading(true)
                const request = await fetch(`${apiUrl}/article/article/${articleId.id}`, {
                    method: "GET"
                });
                const data = await request.json()
                setArticle(data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        getArticle()
    }, [])


    return (
        <section className="min-h-screen py-4">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Space Explorer | Article sur ${article?.Title}`}</title>
                <meta name="description" content="Bienvenue sur la page dédier au image de Space Explorer, ici vous pourez observer des planète, étoiles, comètes, vaiseau et autres magnifique cliché veanant de l'espace" />
            </Helmet>
            {loading === true ?

                <Spinner />
                :
                <article className='w-11/12 md:w-9/12 max-w-4xl mx-auto mb-5 p-2 md:p-4 min-h-screen'>
                    <div className='text-center py-2 md:py-6'>
                        {article?.Slug &&
                            <span className='inline-block bg-gradient-to-r from-violet-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3'>
                                {article.Slug}
                            </span>
                        }
                        <h1 className='text-xl md:text-2xl xl:text-3xl font-bold dark:text-white first-letter:uppercase'>{article?.Title}</h1>
                    </div>

                    {article?.Image &&
                        <img
                            src={`${apiUrl}/${encodeURIComponent(article.Image)}`}
                            alt={article.Title}
                            className='w-full max-h-[480px] object-cover rounded-xl mb-8'
                        />
                    }

                    <div
                        className='article-content md:text-base text-black dark:text-white text-justify'
                        dangerouslySetInnerHTML={{ __html: resolveArticleMedia(article?.Contenu, apiUrl) }}
                    />

                    <div className='flex justify-start mt-8'>
                        <BouttonBackWard />
                    </div>
                </article>
            }


        </section>
    )
}
