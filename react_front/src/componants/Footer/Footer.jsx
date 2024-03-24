import React from 'react'
import Space_Explorer from "../../../public/favicon.png"
import ThemeButton from '../ThemeButton/ThemeButton'
import { useNavigate } from 'react-router-dom'
export default function Footer() {
    const navigate = useNavigate()
    const getFullYear = () => {
        return new Date().getFullYear()
    }

    return (
        <footer className="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-[#1C1E21] ">
            <div className="flex flex-col lg:flex-row items-center justify-center sm:justify-between">
                <button role='button' aria-label='Theme' onClick={() => { navigate("/") }} className="flex items-center mb-4 sm:mb-0 mr-14 md:mr-0">
                    <img src={Space_Explorer} className="w-14 h-14 md:mr-3 hover:animate-pulse" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Space Explorer</span>
                </button>
                <ul className="flex flex-wrap flex-col  sm:flex-row items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <button onClick={() => { navigate("/mentions-legales") }} className="mr-4 hover:underline md:mr-6 ">Mentions légales</button>
                    </li>
                    <li>
                        <button onClick={() => { navigate("/politique-confidentialite") }} className="mr-4 hover:underline md:mr-6">Politique de confidentialité</button>
                    </li>

                    <li>
                        <button onClick={() => { navigate("/nous-contacter") }} className="hover:underline">Nous contacter</button>
                    </li>
                    <li>
                        <ThemeButton />
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">@ {getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Space Explorer</a>. Tous droits réservés.
            </span>
        </footer >
    )
}
