import React from 'react'

export default function CardNews() {
  return (
    <article className='bg-slate-500 col-span-9 mx-auto'>
        <div>
            <img className='max-h-[350px] w-full object-cover' src="https://media.kasperskydaily.com/wp-content/uploads/sites/93/2019/09/16125613/internet-in-space-featured.jpg" alt="" />
            
        </div>
        <div className='p-1 md:p-4'>
            
        
            <div className='my-2 text-md md:text-xl '>
                <h2 className='text'>Lorem ipsum dolor sit amet.</h2>
            </div>
            <div>
                
                <div className='flex w-9/12 md:w-full'>
                        <p className='mr-1'>#Travel</p>
                        <p className='mr-1'>#LifeStyle</p>
                        <p className='mr-1'>#Technology</p>
                </div>
                    
                
            </div>
            <div className='mt-1'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolorum amet impedit quaerat, ratione nemo reiciendis voluptatum sit eaque perspiciatis molestias odit recusandae vel nobis corporis quis earum dolores. Sed?</p>
            </div>
            <button className='bg-black hover:bg-white hover:text-black transition-all duration-300 p-4 text-white mt-5'>
                <a href="">Lire la suite</a>
            </button>
        </div>
    </article>
  )
}
