import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import userContext from '../../Context/userContext';
import { BouttonBackWard } from '../../componants/BouttonBackWard/BouttonBackWard';
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

                <p>Loading ...</p>
                :
                <article className='container mx-auto mb-5 p-2 md:p-4 min-h-screen'>
                    <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase '>{article?.Title}</h1>

                    {article?.Contenu.map((element, index) => (


                        <div key={index} className='mb-14' >
                            <h2 className="text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase mb-4 ">{element.titre}</h2>
                            <div className={`flex ${index % 2 === 0 ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'} my-5 md:my-0 mx-4`}>

                                <img src={`${apiUrl}/${element.image.replace(/\\/g, "/")}`} alt="Une image liée à un article"
                                    className="object-contain w-full h-auto lg:w-[350px] lg:h-full" />
                                <p className=' md:text-base text-black dark:text-white w-fit first-letter:uppercase px-0 md:px-4 text-justify'>{element.contenu}</p>

                            </div>
                        </div>
                    ))}
                </article>
            }
        </section>
    )
}
