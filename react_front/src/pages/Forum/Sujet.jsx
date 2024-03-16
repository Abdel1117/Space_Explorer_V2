import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../../componants/Spinner/Spinner';
import { Reponse } from '../../componants/Reponse/Reponse';
import userContext from '../../Context/userContext';
export const Sujet = () => {
    const sujetId = useParams()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)
    const [sujet, setSujet] = useState(null)
    const [messagePosted, setMessagePosted] = useState(false)
    const { userAuth } = useContext(userContext)

    const getSujetAndResponse = async () => {

        try {
            setLoading(true)
            const request = await fetch(`${apiUrl}/forum/forum/${sujetId.id}`, {
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
                                <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-4 px-4 w-full'>
                                    <div className="relative w-auto h-[75px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 py-1 px-1  md:mt-0">
                                        {sujet?.User.avatar != undefined ?

                                            <img src={`${apiUrl}/${sujet?.User.avatar.replace(/\\/g, "/")}`} alt="image_profil" className='rounded-full w-20 h-20 ' />
                                            :
                                            <img src="..\..\src\assets\icon_svg\defaultAvatar.jpg" alt="image_profil" className='rounded-full w-20 h-auto x' />

                                        }

                                    </div>
                                    <div className='min-h-[70px] flex flex-col md:flex-row justify-center md:justify-between items-center md:p-2 lg:p-4 ml-0 md:ml-10 w-full'>
                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center md:text-left'>
                                            {sujet?.User.pseudo}
                                        </p>
                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center'>
                                            {sujet?.FormattedDate}
                                        </p>
                                    </div>
                                </div>
                                <div className='md:ml-[120px] p-4'>
                                    <p className='text-sm md:text-base text-black dark:text-white mt-2 px-2 first-letter:uppercase'>
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
                                                    <div className="relative h-auto md:h-[75px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 py-1 px-1 ml-2 mt-4 md:mt-0">
                                                        {rep?.user.avatar != undefined ?
                                                            <img src={`${apiUrl}/${rep?.user.avatar}`} alt="image_profil" className='rounded-full w-20 h-20 z-50' />
                                                            :
                                                            <img src="..\..\src\assets\icon_svg\defaultAvatar.jpg" alt="image_profil" className='rounded-full w-20 h-auto z-50' />
                                                        }

                                                    </div>
                                                    <div className='min-h-[70px] flex flex-col md:flex-row justify-center md:justify-between items-center md:p-2  ml-0 md:ml-10 w-full '>
                                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center'>
                                                            {rep?.user.pseudo}
                                                        </p>
                                                        <p className='text-sm md:text-base text-black dark:text-white mt-2 w-fit first-letter:uppercase text-center'>
                                                            {rep?.FormattedDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='md:ml-[120px] p-4 '>
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
                        {userAuth != undefined &&
                            <Reponse
                                sujetId={sujetId}
                                messagePosted={messagePosted}
                                setMessagePosted={setMessagePosted}
                            />
                        }

                    </section>
            }
        </>
    )
}
