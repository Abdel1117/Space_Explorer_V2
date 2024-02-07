import React from 'react'
import { useEffect, useState } from 'react'
import { FcHome, FcBusinessman, FcBusinesswoman, FcConferenceCall, FcFeedback, FcSettings } from "react-icons/fc"

export default function aside(props) {

    const { blockSection, setBlockSection } = props;
    const apiUrl = import.meta.env.VITE_API_URL

    return (
        <>
            {Object.keys(props.data).length === 0
                ? (
                    <div className=' w-full sm:w-3/6 md:w-2/6 lg:w-3/6 xl:w-[350px] border shadow-lg min-h-[500px] md:ml-5 md:mt-5 rounded-lg text-center '>Loading ... </div>
                )
                : (

                    <aside className='w-full md:w-2/6 lg:2/6  xl:w-[350px] shadow-lg border min-h-[500px] md:ml-5 mb-4 md:mb-0 rounded-lg dark:text-white bg-[#fafafa ] dark:bg-[#252525]'>

                        <div className='flex flex-col lg:flex-row ml-2 mt-2 '>
                            {props.data.avatar != undefined ?

                                <img src={`${apiUrl}/${props.data.avatar.replace(/\\/g, "/")}`} alt="image_profil" className='rounded-full w-20 h-auto x' />
                                :
                                <img src="..\..\src\assets\icon_svg\defaultAvatar.jpg" alt="image_profil" className='rounded-full w-20 h-auto x' />
                            }
                            <div className='block lg:ml-3 my-auto'>
                                <p className='text-xs md:text-md font-bold'>{props.data.email}</p>
                                <p className='text-xs md:text-md mt-2 md:mt-0 text-gray-400 -'>id: {props.data._id}</p>
                            </div>
                        </div>
                        <p className='text-sm lg:text-md text-gray-400 py-2 border-b-black my-2 ml-2'>Menu</p>
                        <div className='w-full h-[200px} mt-4'>

                            <ul className='space-y-2'>
                                <div onClick={() => setBlockSection("Accueil")} className='flex items-center hover:bg-slate-400 cursor-pointer '>

                                    <FcHome size={25} className="ml-2" />
                                    <li className='my-1 ml-2 w-full'>Accueil</li>
                                </div>
                                <div onClick={() => setBlockSection("Profil")} className='flex items-center hover:bg-slate-400 cursor-pointer '>

                                    {props.sex &&

                                        props.sex === "F" ?
                                        <FcBusinesswoman size={25} className="ml-2" />
                                        :
                                        <FcBusinessman size={25} className="ml-2" />


                                    }
                                    <li className='my-1 text-base ml-2 w-full'>Profil</li>
                                </div>
                                <div onClick={() => setBlockSection("Amis")} className='flex items-center hover:bg-slate-400 cursor-pointer '>
                                    <FcConferenceCall size={25} className="ml-2" />
                                    <li className='my-1 text-base ml-2 w-full'>Vos amis</li>
                                </div>
                                <div onClick={() => setBlockSection("Messages")} className='flex items-center hover:bg-slate-400 cursor-pointer '>
                                    <FcFeedback size={25} className="ml-2" />
                                    <li className='my-1 text-base ml-2 w-full'>Vos messages</li>
                                </div>
                                <div onClick={() => setBlockSection("Parametre")} className='flex items-center hover:bg-slate-400 cursor-pointer '>
                                    <FcSettings size={25} className="ml-2" />
                                    <li className='my-1 text-base ml-2 w-full'>Paramètre</li>
                                </div>

                            </ul>
                        </div>
                        <div className=' my-4 '>
                            <p className='ml-2 text-sm lg:text-md text-gray-400'>Autres</p>
                            <ul>
                                <div className='hover:bg-slate-400 cursor-pointer flex items-center'>
                                    <li className='ml-2 my-1 '>Features 1</li>
                                </div>
                                <div className='hover:bg-slate-400 cursor-pointer flex items-center'>
                                    <li className='ml-2 my-1 '>Features 2</li>
                                </div>
                            </ul>
                        </div>

                        <div className=''>
                            <p className='ml-2 text-sm lg:text-md text-gray-400 '>Membres depuis le 20 Janvier 2023</p>
                        </div>
                    </aside>
                )}</>
    )
}
