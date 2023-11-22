import { React, useState, useEffect, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../../componants/Spinner/Spinner';
import { Reponse } from '../../componants/Reponse/Reponse';
export const Sujet = () => {
    const sujetId = useParams()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)
    const [sujet, setSujet] = useState(null)
    const [messagePosted, setMessagePosted] = useState(false)
    const getSujetAndResponse = async () => {

        try {
            setLoading(true)
            const request = await fetch(`${apiUrl}/forum/${sujetId.id}`, {
                method: "GET"
            });

            const response = await request.json();
            setSujet(response);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false)
            setMessagePosted(false)

        }
    }

    useEffect(() => {
        getSujetAndResponse()
    }, [messagePosted])

    return (
        <>
            {
                loading === true ? <Spinner /> :
                    <section className='min-h-screen py-4'>
                        <div >
                            <div>
                                <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase'>{sujet?.Title}</h1>
                            </div>

                        </div>

                        <div className='w-full md:w-8/12 md:ml-2 px-2 md:px-0'>

                            <article className='shadow-lg bg-[#ffffff] rounded-lg dark:bg-[#1C1C1C] mb-6'>
                                <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-1 px-1 w-full'>
                                    <div className="relative w-[75px] h-[75px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 py-1 px-1 ml-2 mt-4 md:mt-0">
                                        <svg className="absolute w-[75px] h-[75px] text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className='min-h-[70px] flex flex-col md:flex-row justify-center md:justify-between items-center md:p-2 lg:p-4 ml-0 md:ml-10 w-full'>
                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center md:text-left'>
                                            {sujet?.User.email}
                                        </p>
                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center'>
                                            {sujet?.FormattedDate}
                                        </p>
                                    </div>
                                </div>
                                <div className='md:ml-[100px] p-4'>
                                    <p className='text-sm md:text-base text-black dark:text-white mt-2 p-2 first-letter:uppercase'>
                                        {sujet?.Sujet}

                                    </p>
                                </div>


                            </article>

                            {
                                sujet?.Reponses != null ?

                                    (
                                        sujet?.Reponses.map((rep, index) =>
                                        (


                                            <article key={index} className='shadow-lg bg-[#ffffff] rounded-lg dark:bg-[#1C1C1C] mb-6'>
                                                <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-1 px-1 w-full'>
                                                    <div className="relative w-[75px] h-[75px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 py-1 px-1 ml-2 mt-4 md:mt-0">
                                                        <svg className="absolute w-[75px] h-[75px] text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                    </div>
                                                    <div className='min-h-[70px] flex flex-col md:flex-row justify-center md:justify-between items-center md:p-2 lg:p-4 ml-0 md:ml-10 w-full'>
                                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center'>
                                                            {sujet?.User.email}
                                                        </p>
                                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center'>
                                                            {rep?.FormattedDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='md:ml-[100px] p-4'>
                                                    <p className='text-sm md:text-base text-black dark:text-white mt-2 p-2 first-letter:uppercase'>
                                                        {rep?.content}

                                                    </p>
                                                </div>

                                            </article>
                                        )
                                        ))
                                    :
                                    null
                            }
                        </div>
                        <Reponse
                            sujetId={sujetId}
                            messagePosted={messagePosted}
                            setMessagePosted={setMessagePosted}
                        />
                    </section>
            }
        </>
    )
}
