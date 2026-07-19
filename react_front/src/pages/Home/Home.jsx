
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet"
import Hero from '../../componants/Hero/Hero';
import RecentArticles from '../../componants/RecentArticles/RecentArticles';
import ThemeSection from '../../componants/ThemeSection/ThemeSection';
import NewsLetter from '../../componants/newsLetter/NewsLetter';
import { SkeletonArticle } from '../../componants/Skeleton/SkeletonArticle/SkeletonArticle';

const CATEGORIES = ["Etoile", "Planète", "Systeme Solaire", "Objet Stélaire", "Météorite"]

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

    const heroArticle = articles?.[0]
    const otherArticles = articles?.slice(1) ?? []
    const recentArticles = otherArticles.slice(0, 5)
    const themeSections = CATEGORIES
        .map((theme) => ({
            theme,
            articles: otherArticles.filter((article) => article.Slugs?.includes(theme))
        }))
        .filter((section) => section.articles.length > 0)

    return (
        <section className='w-11/12 md:w-9/12 mx-auto pb-12'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Accueil</title>
                <meta name="description" content="Space Explorer est un site sur l'astronomie et l'espace, découvrez des articles passionnant et des images magnifiques d'étoiles et de planète." />
            </Helmet>
            <h1 className='hidden'>Space Explorer</h1>
            
            <div className='grid lg:grid-cols-12 gap-5 mb-12'>
                <div className='lg:col-span-8'>
                    {loading || articles === undefined ?
                        <div className='w-full h-[380px] md:h-[560px] rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse' />
                        :
                        <Hero article={heroArticle} />
                    }
                </div>
                <div className='lg:col-span-4 flex flex-col gap-5'>
                    {!loading && recentArticles.length > 0 &&
                        <RecentArticles articles={recentArticles} />
                    }
                    <NewsLetter />
                </div>
            </div>

            {
                loading === true || articles === undefined ?
                    <div className='grid md:grid-cols-12 gap-5'>
                        <SkeletonArticle />
                        <SkeletonArticle />
                        <SkeletonArticle />
                    </div>
                    :
                    themeSections.map((section) =>
                        <ThemeSection key={section.theme} theme={section.theme} articles={section.articles} />
                    )
            }
        </section>
    );
}

export default Home;
