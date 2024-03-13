import React from 'react'

export default function TagsArticleList() {
    return (
        <div className='bg-slate-500  md:h-full p-1 md:p-5 sm:w-6/12 lg:w-full'>
            <h2 className='text-white text-md md:text-xl my-4'>Categories</h2>

            <div className='flex flex-col justify-between align-super'>
                <div className='bg-white my-4'>
                    <div className='flex justify-between items-center bg-white p-4'>
                        <p className='text-xs'>Etoile </p>
                    </div>
                </div>
                <div className='bg-white my-4'>
                    <div className='flex justify-between items-center bg-white p-4'>
                        <p className='text-xs'>Planète </p>
                    </div>
                </div>
                <div className='bg-white my-4'>
                    <div className='flex justify-between items-center bg-white p-4'>
                        <p className='text-xs'>Système Solaire </p>
                    </div>
                </div>
                <div className='bg-white my-4'>
                    <div className='flex justify-between items-center bg-white p-4'>
                        <p className='text-xs'>Objet Stélaire </p>
                    </div>
                </div>
                <div className='bg-white my-4'>
                    <div className='flex justify-between items-center bg-white p-4'>
                        <p className='text-xs'>Météorite </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
