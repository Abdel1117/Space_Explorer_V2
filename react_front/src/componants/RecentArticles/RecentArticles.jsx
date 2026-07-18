import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecentArticles({ articles }) {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL

    return (
        <div className='bg-white dark:bg-[#1a1a2e] rounded-xl shadow-md p-4 md:p-5'>
            <h2 className='text-lg font-bold dark:text-white mb-3 border-l-4 border-violet-500 pl-3'>
                Articles récents
            </h2>
            <div className='flex flex-col divide-y divide-gray-100 dark:divide-gray-700'>
                {articles.map((article) => (
                    <div
                        key={article._id}
                        role='button'
                        aria-label={article.Title}
                        onClick={() => navigate(`article/${article._id}`)}
                        className='flex items-center gap-3 cursor-pointer group py-3 first:pt-0 last:pb-0'
                    >
                        <div className='w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden'>
                            <img
                                src={`${apiUrl}/${article.Contenu?.[0]?.image}`}
                                alt={article.Title}
                                loading='lazy'
                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                            />
                        </div>
                        <div className='min-w-0'>
                            {article.Slugs?.[0] &&
                                <span className='block text-violet-500 dark:text-violet-400 text-xs font-semibold uppercase tracking-wide'>
                                    {article.Slugs[0]}
                                </span>
                            }
                            <h3 className='font-semibold dark:text-white text-sm leading-snug group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200'>
                                {article.Title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
