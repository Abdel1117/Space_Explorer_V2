import React from 'react';

const BoxGrid = () => {
    return (
        <div className='mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10'>
            
            <div className=' min-w-full w-full'>
                <a href="">
                    <img  className='w-full max-h-[250px]  object-cover' src="https://via.placeholder.com/250" alt="" />
                </a>
                <div className='mx-auto text-center md:p-4'>
                    <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                        Catégorie
                    </div>
                    <h2 className='my-2 font-bold'>Mon Titre</h2>
                    <div className='mx-auto '>
                        <small className='text-grey'>2 day ago</small>
                    </div>
                </div>
            </div>
            <div className=' min-w-full w-full'>
                <a href="">
                <img  className='w-full max-h-[250px]  object-cover' src="https://via.placeholder.com/250" alt="" />
                </a>
                <div className='mx-auto text-center md:p-4'>
                    <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                        Catégorie
                    </div>
                    <h2 className='my-2 font-bold'>Mon Titre</h2>
                    <div className='mx-auto '>
                        <small className='text-grey'>2 day ago</small>
                    </div>
                </div>

            </div>
            <div className=' min-w-full w-full'>
                <a href="">
                <img  className='w-full max-h-[250px]  object-cover' src="https://via.placeholder.com/250" alt="" />
                </a>
                <div className='mx-auto text-center md:p-4'>
                    <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                        Catégorie
                    </div>
                    <h2 className='my-2 font-bold'>Mon Titre</h2>
                    <div className='mx-auto '>
                        <small className='text-grey'>2 day ago</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxGrid;
