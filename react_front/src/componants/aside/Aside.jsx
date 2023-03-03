import React from 'react'
import { useEffect, useState } from 'react'
import { FcHome, FcBusinessman, FcBusinesswoman, FcConferenceCall, FcFeedback, FcSettings } from "react-icons/fc"

export default function aside(props) {

    const { blockSection, setBlockSection } = props;


    return (
        <>
            {Object.keys(props.data).length === 0
                ? (
                    <div className=' w-full sm:w-3/6 md:w-2/6 lg:w-3/6 xl:w-[350px] border shadow-lg min-h-[500px] md:ml-5 md:mt-5 rounded-lg text-center'>Loading ... </div>
                )
                : (

                    <aside className='w-full sm:w-3/6 md:w-2/6 lg:w-3/6 xl:w-[350px] shadow-lg border min-h-[500px] md:ml-5 rounded-lg dark:text-white'>

                        <div className='flex ml-2 mt-2 '>
                            <img src="https://via.placeholder.com/150" alt="image_profil" className='rounded-lg w-20 h-auto x' />
                            <div className='block md:ml-3 '>
                                <p className='text-xs md:text-md font-bold'>{props.data.email}</p>
                                <p className='text-xs md:text-md mt-2 md:mt-0 text-gray-400 -'>id: {props.data._id}</p>
                            </div>
                        </div>
                        <p className='text-sm lg:text-md text-gray-400 py-2 border-b-black my-2 ml-2'>Menu</p>
                        <div className='w-full h-[200px} mt-4'>

                            <ul className='space-y-2'>
                                <div className='flex items-center hover:bg-slate-400 cursor-pointer '>

                                    <FcHome size={25} className="ml-2" />
                                    <li onClick={() => setBlockSection("Accueil")} className='my-1 ml-2 w-full'>Accueil</li>
                                </div>
                                <div className='flex items-center hover:bg-slate-400 cursor-pointer '>

                                    {props.sex &&

                                        props.sex === "F" ?
                                        <FcBusinesswoman size={25} className="ml-2" />
                                        :
                                        <FcBusinessman size={25} className="ml-2" />


                                    }
                                    <li onClick={() => setBlockSection("Profil")} className='my-1 text-base ml-2 w-full'>Profil</li>
                                </div>
                                <div className='flex items-center hover:bg-slate-400 cursor-pointer '>
                                    <FcConferenceCall size={25} className="ml-2" />
                                    <li onClick={() => setBlockSection("Amis")} className='my-1 text-base ml-2 w-full'>Vos amis</li>
                                </div>
                                <div className='flex items-center hover:bg-slate-400 cursor-pointer '>
                                    <FcFeedback size={25} className="ml-2" />
                                    <li onClick={() => setBlockSection("Messages")} className='my-1 text-base ml-2 w-full'>Vos messages</li>
                                </div>
                                <div className='flex items-center hover:bg-slate-400 cursor-pointer '>
                                    <FcSettings size={25} className="ml-2" />
                                    <li onClick={() => setBlockSection("Parametre")} className='my-1 text-base ml-2 w-full'>Paramètre</li>
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
                            <p className='ml-2 text-sm lg:text-md text-gray-400'>Membres depuis le 20 Janvier 2023</p>
                        </div>
                    </aside>
                )}</>
    )
}
