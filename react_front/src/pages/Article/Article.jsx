import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import userContext from '../../Context/userContext';
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
                const request = await fetch(`${apiUrl}/article/${articleId.id}`, {
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
        <section classNaùe="min-h-screen py-4">

            {loading === true ?

                <p>Loading ...</p>
                :
                <article className='container mx-auto p-2 md:p-4 min-h-screen'>
                    <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase'>{article?.Title}</h1>

                    {article?.Contenu.map((element, index) => (


                        <div key={index}  >
                            <h2 className="text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase mb-4 ">{element.titre}</h2>
                            <div className={`flex ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'} my-5 md:my-0 mx-4`}>

                                <img src="https://via.placeholder.com/250x250" alt="Une image liée à un article"
                                    className="object-cover w-50 h-50 md:w-100 md:h-auto" />
                                <p className=' md:text-base text-black dark:text-white w-fit first-letter:uppercase px-0 md:px-4 '>{element.contenu}</p>

                            </div>
                        </div>
                    ))}

                </article>
            }
        </section>
    )
}
