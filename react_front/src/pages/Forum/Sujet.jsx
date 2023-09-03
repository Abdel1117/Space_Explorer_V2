import { React, useState, useEffect, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../../componants/Spinner/Spinner';
export const Sujet = () => {
    const sujetId = useParams()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)
    const [sujet, setSujet] = useState(null)

    const getSujetAndResponse = async () => {
        try {
            setLoading(true)
            const request = await fetch(`${apiUrl}/forum/${sujetId.id}`, {
                method: "GET"
            });

            const response = await request.json();
            setSujet(response);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getSujetAndResponse()
    }, [])
    return (
        <>
            {
                loading === true ? <Spinner /> :
                    <section className='min-h-screen'>
                        <div >
                            <div>
                                <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'>{sujet?.Title}</h1>
                            </div>

                        </div>

                        <div className=' border-white container min-h-[200px]'>

                            <article className='border border-white relative flex flex-col md:flex-row justify-center md:justify-start items-center '>
                                <div className='w-full flex items-center justify-center py-2'>
                                    <div class="relative w-[100px] h-[100px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                                        <svg class="absolute w-[110px] h-[110px] text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className='border-y border-slate-500 dark:border-white min-h-[200px] min-w-full p-1 md:p-2 lg:p-4 '>
                                    <p className='text-sm md:text-base text-black dark:text-white mt-2'>
                                        {sujet?.Sujet}
                                    </p>
                                </div>

                                <div className=' border-red-900 min-h-[70px] min-w-full p-1 md:p-2 lg:p-4'>

                                    <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit float-left'>
                                        {sujet?.User.email}
                                    </p>
                                    <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit float-right'>
                                        {sujet?.FormattedDate}
                                    </p>
                                </div>
                            </article>


                        </div>

                    </section>





            }


        </>
    )
}
