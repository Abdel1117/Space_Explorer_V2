import React from 'react'
import { useNavigate } from 'react-router-dom'
import { truncate } from '../../Functions/TextRendering/truncate'
import { stripHtml } from '../../Functions/TextRendering/stripHtml'

export default function CardNews({ index, title, slugs, para, image }) {

    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL

    return (
        <article
            role='button'
            aria-label={title}
            onClick={() => navigate(`article/${index}`)}
            className='w-full bg-white dark:bg-[#1a1a2e] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group'
        >
            <div className='overflow-hidden h-[180px] md:h-[200px]'>
                <img
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    loading='lazy'
                    src={`${apiUrl}/${image}`}
                    alt={title}
                />
            </div>
            <div className='p-4 md:p-5'>
                <div className='flex flex-wrap gap-2 mb-3'>
                    {slugs.map((slug, index) =>
                        <span key={index} className='bg-gradient-to-r from-violet-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                            {slug}
                        </span>
                    )}
                </div>
                <h2 className='text-lg font-bold dark:text-white mb-2'>{title}</h2>
                <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>{truncate(stripHtml(para), 150)}</p>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate(`article/${index}`) }}
                    className='bg-black dark:bg-white dark:hover:bg-violet-600 dark:text-black text-white hover:bg-violet-600 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium'
                >
                    Lire la suite
                </button>
            </div>
        </article>
    )
}
