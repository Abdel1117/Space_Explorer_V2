import React from 'react'
import { useNavigate } from "react-router-dom"
export const BouttonBackWard = () => {

    const navigate = useNavigate();

    const goBack = (src) => {
        navigate(`${src}`)
    }

    return (
        <button aria-label='Précedent' onClick={() => {
            goBack("/")
        }} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[120px]">
            <svg class="w- h-4 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
            <span class="flex items-center  justify-center ml-2 my-auto">Précedent</span>

        </button>)
}
