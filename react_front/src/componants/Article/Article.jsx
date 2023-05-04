import React from 'react'

export default function Article({titre, categorie, date, image}) {
  return (
    <article className=' min-w-full w-full'>
                <a href="">
                    <img className='w-full md:max-h-[350px] object-cover' src={image} alt="" />
                </a>
                <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                    <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                        {categorie}
                    </div>
                    <h2 className='my-2 font-bold'>{titre}</h2>
                    <div className='mx-auto '>
                        <small className='text-grey'>{date}</small>
                    </div>
                </div>
    </article>
  )
}
