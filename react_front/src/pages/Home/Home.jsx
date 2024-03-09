
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet"
import ImageHolder from '../../componants/imageHolder/imageHolder';
import NewsLetter from '../../componants/newsLetter/NewsLetter';
import CardNews from '../../componants/cardNews/CardNews';
import TagsArticleList from '../../componants/tagsArticlesList/TagsArticleList';
import Carousel from '../../componants/Carousel/Carousel';
import { SkeletonArticle } from '../../componants/Skeleton/SkeletonArticle/SkeletonArticle';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState(undefined)

    useEffect(() => {
        const getArticle = async () => {
            const urlBack = import.meta.env.VITE_API_URL
            setLoading(true)
            try {
                const data = await fetch(`${urlBack}/article/`, {
                    method: "GET"
                })
                const response = await data.json()
                setArticles(response)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }




        }
        getArticle()

    }, [])
    return (
        <section className='w-11/12 md:w-9/12 mx-auto pb-12'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Accueil</title>
                <meta name="description" content="Space Explorer est un site sur l'astronomie et l'espace, découvrez des articles passionnant et des images magnifiques d'étoiles et de planète." />
            </Helmet>
            <h1 className='hidden'>Space Explorer</h1>
            <ImageHolder />
            {articles != undefined ?
                <Carousel data={articles} loading={loading} />
                : null
            }
            <div className='grid md:grid-cols-12 gap-5 mt-10 relative '>
                {
                    loading === true || articles == undefined ?
                        <>
                            <SkeletonArticle />
                            <SkeletonArticle />
                            <SkeletonArticle />
                            <SkeletonArticle />
                            <SkeletonArticle />
                        </>

                        :

                        articles?.map((article, index) =>
                            <CardNews key={index} index={article?._id} title={article?.Title} slugs={article?.Slugs} para={article?.Contenu[0]?.contenu}
                                image={article?.Contenu[0]?.image}
                            />

                        )
                }
                <div className='col-span-12 lg:col-span-3 sm:flex lg:flex-col sm:justify-between lg:absolute lg:top-0 lg:-right-12 xl:right-2 2xl:right-18'>

                    <NewsLetter />
                    <TagsArticleList />
                </div>
            </div >
        </section>
    );
}

export default Home;
