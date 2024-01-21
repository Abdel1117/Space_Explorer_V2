import React from 'react'

export const MeSoutenir = () => {
    return (
        <section className="min-h-screen">
            <h1 className='mx-auto  pt-4 md:pt-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase'>Soutenir Space Explorer</h1>
            <div className='border dark:border-white border-black mx-auto w-9/12 md:w-[800px] min-h-[400px] '>
                <img className='max-w-[400px] h-auto mx-auto' src='../../../src/assets/images/GiveAway-removebg.png' alt="Image astronaute tenant un sac remplie d'argent" />

                <div className='grid grid-cols-3'>
                    <div className='h-[500px] w-auto border border-black dark:border-white  rounded-md'>
                        <h2 className="text-black dark:text-white text-xl md:text-3xl text-center mt-10 font-bold">5€</h2>
                        <div className='text-center'>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4  mx-auto cursor">
                                Offrir
                            </button>
                        </div>
                    </div>
                    <div className='h-[500px] w-auto border border-black dark:border-white  rounded-md'>
                        <h2 className="text-black dark:text-white text-xl md:text-3xl text-center mt-10 font-bold">10€</h2>
                        <div className='text-center'>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mx-auto  cursor">
                                Offrir
                            </button></div>
                    </div>
                    <div className='h-[500px] w-auto border border-black dark:border-white  rounded-md'>
                        <h2 className="text-black dark:text-white text-xl md:text-3xl className='mx-auto' text-center mt-10 font-bold">15€</h2>
                        <div className='text-center'>

                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mx-auto  cursor">
                                Offrir
                            </button>
                        </div>
                    </div>

                </div >

            </div >
        </section >
    )
}
