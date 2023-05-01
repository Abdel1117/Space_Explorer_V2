import React, { useState } from 'react'
import { GrHome, GrArticle, GrImage, GrVideo, GrUser } from "react-icons/gr"
import { BsList, BsXLg } from "react-icons/bs"
export default function Side_Barre_DashBoard(props) {

    const [toogle, setToogle] = useState(false);
    const { blockSection, setBlockSection } = props

    return (
        <div className="flex ">
            <div className={`flex flex-col h-screen p-3 bg-white dark:bg-gray-800 shadow transition-all duration-150 ${toogle === true ? "w-60" : "w-16"} `}>
                <div className="space-y-3">

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                onClick={() => { setToogle(!toogle) }}
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input

                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full bg-gray-200 dark:bg-white py-2 pl-10 text-sm rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <button
                                    onClick={() => { setBlockSection("Accueil") }}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <GrHome size={20} />
                                    {
                                        toogle === true &&
                                        <span className="text-dark dark:text-gray-100">Resumé</span>
                                    }
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    onClick={() => { setBlockSection("Articles") }}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <GrArticle size={20} />
                                    {
                                        toogle === true &&
                                        <span className="text-dark dark:text-gray-100">Articles</span>
                                    }
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    onClick={() => { setBlockSection("Images") }}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <GrImage size={20} />
                                    {
                                        toogle === true &&
                                        <span className="text-dark dark:text-gray-100">Images</span>
                                    }
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    onClick={() => { setBlockSection("Users") }}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <GrUser size={20} />
                                    {
                                        toogle === true &&
                                        <span className="text-dark dark:text-gray-100">Utilisateurs</span>
                                    }
                                </button>
                            </li>
                            <li onClick={() => { setToogle(!toogle) }} className="rounded-sm">
                                <button
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    {
                                        toogle === true ?
                                            <>
                                                <BsXLg size={20} />
                                                <span>Reduire</span>
                                            </>
                                            :
                                            <BsList size={20} />
                                    }
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>


    )
}
