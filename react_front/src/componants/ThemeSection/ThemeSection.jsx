import React from 'react'
import CardNews from '../cardNews/CardNews'

export default function ThemeSection({ theme, articles }) {
    return (
        <div className='mb-12'>
            <h2 className='text-lg md:text-xl font-bold dark:text-white mb-4 border-l-4 border-violet-500 pl-3'>
                {theme}
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {articles.map((article) => (
                    <CardNews
                        key={article._id}
                        index={article._id}
                        title={article.Title}
                        slugs={article.Slugs}
                        para={article.Contenu?.[0]?.contenu}
                        image={article.Contenu?.[0]?.image}
                    />
                ))}
            </div>
        </div>
    )
}
