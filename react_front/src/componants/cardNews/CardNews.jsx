import React from 'react'

export default function CardNews() {
    return (
        <article className='bg-slate-500 col-span-12 lg:col-span-8 mx-auto'>
            <div>
                <img className='max-h-[350px] w-full object-cover' src="https://media.kasperskydaily.com/wp-content/uploads/sites/93/2019/09/16125613/internet-in-space-featured.jpg" alt="" />

            </div>
            <div className='p-2 md:p-4'>


                <div className='my-2 text-md md:text-xl '>
                    <h2 className='dark:text-white '>Lorem ipsum dolor sit amet.</h2>
                </div>
                <div>

                    <div className='flex w-9/12 md:w-full'>
                        <p className='mr-1 dark:text-white'>#Travel</p>
                        <p className='mr-1 dark:text-white'>#LifeStyle</p>
                        <p className='mr-1 dark:text-white'>#Technology</p>
                    </div>


                </div>
                <div className='mt-1 dark:text-white'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolorum amet impedit quaerat, ratione nemo reiciendis voluptatum sit eaque perspiciatis molestias odit recusandae vel nobis corporis quis earum dolores. Sed?</p>
                </div>
                <button className='bg-black dark:bg-white dark:hover:bg-black dark:text-black text-white hover:bg-white hover:text-black transition-all duration-300 p-4 dark:hover:text-white mt-5'>
                    <a href="">Lire la suite</a>
                </button>
            </div>
        </article>
    )
}
