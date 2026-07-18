import React from 'react'
import { useNavigate } from 'react-router-dom'
import { truncate } from '../../Functions/TextRendering/truncate'
import { stripHtml } from '../../Functions/TextRendering/stripHtml'

export default function Hero({ article }) {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL

    if (!article) return null

    const image = article.Contenu?.[0]?.image
    const excerpt = truncate(stripHtml(article.Contenu?.[0]?.contenu), 220)

    return (
        <div
            role='button'
            aria-label={article.Title}
            onClick={() => navigate(`article/${article._id}`)}
            className='relative w-full h-[380px] md:h-[560px] rounded-xl overflow-hidden cursor-pointer group'
        >
            <img
                src={`${apiUrl}/${image}`}
                alt={article.Title}
                loading='eager'
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent' />
            <div className='absolute bottom-0 left-0 p-5 md:p-10 w-full md:w-3/4'>
                {article.Slugs?.[0] &&
                    <span className='inline-block bg-gradient-to-r from-violet-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3'>
                        {article.Slugs[0]}
                    </span>
                }
                <h2 className='text-white text-xl md:text-3xl xl:text-4xl font-bold mb-3'>
                    {article.Title}
                </h2>
                <p className='hidden md:block text-gray-200 mb-4'>{excerpt}</p>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate(`article/${article._id}`) }}
                    className='bg-white text-black hover:bg-black hover:text-white transition-all duration-300 font-medium px-5 py-2.5 rounded-lg'
                >
                    Lire la suite
                </button>
            </div>
        </div>
    )
}
