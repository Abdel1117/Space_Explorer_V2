import React from 'react'
import { useNavigate } from 'react-router-dom'
import { truncate } from '../../Functions/TextRendering/truncate'
export default function CardNews({ index, title, slugs, para, image }) {

    const navigate = useNavigate()
    const Title = title
    const Slugs = slugs
    const resumer = para
    const apiUrl = import.meta.env.VITE_API_URL

    return (
        <article className='bg-slate-500 col-span-12 lg:col-span-8 mx-auto'>
            <div>
                <img className='max-h-[350px] w-full object-cover' src={`${apiUrl}/${image}`} alt="" />

            </div>
            <div className='p-2 md:p-4'>


                <div className='my-2 text-md md:text-xl '>
                    <h2 className='dark:text-white '> {title} </h2>
                </div>
                <div>

                    <div className='flex w-9/12 md:w-full'>
                        {Slugs.map((slug, index) =>
                            <>
                                <p key={index} className='mr-2 dark:text-white'>#{slug}  </p>

                            </>
                        )}


                    </div>


                </div>
                <div className='mt-1 dark:text-white'>
                    <p>{truncate(resumer, 150)}</p>
                </div>
                <button onClick={() => { navigate(`article/${index}`) }} className='bg-black dark:bg-white dark:hover:bg-black dark:text-black text-white hover:bg-white hover:text-black transition-all duration-300 p-4 dark:hover:text-white mt-5'>
                    Lire la suite
                </button>
            </div>
        </article >
    )
}
