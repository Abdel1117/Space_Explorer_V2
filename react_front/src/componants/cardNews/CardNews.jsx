import React from 'react'

export default function CardNews() {
  return (
    <article className='bg-slate-500 col-span-9'>
        <div>
            <img className='max-h-[350px] w-full object-cover' src="https://media.kasperskydaily.com/wp-content/uploads/sites/93/2019/09/16125613/internet-in-space-featured.jpg" alt="" />
            
        </div>
        <div className='p-1 md:p-4'>
            
        
            <div className='my-2 text-md md:text-xl '>
                <h2>Lorem ipsum dolor sit amet.</h2>
            </div>
            <div>
                
                <div className='flex'>
                        <p>Travel</p>
                        <p>LifeStyle</p>
                        <p>Technology</p>
                </div>
                    
                
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dolorum amet impedit quaerat, ratione nemo reiciendis voluptatum sit eaque perspiciatis molestias odit recusandae vel nobis corporis quis earum dolores. Sed?</p>
            </div>
            <div>
                <a href="">Lire la suite...</a>
            </div>
        </div>
    </article>
  )
}
