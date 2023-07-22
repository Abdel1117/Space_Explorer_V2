import React from 'react'

export default function Toast_invalide({ message, index, deletePopUp }) {

    return (
        <div className='bg-white border rounded-md shadow-xl min-w-[fit-content] mx-auto p-3 md:p-5 animate-fadeIn  fixed bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%] flex flex-col md:flex-row items-center justify-center '>
            <button
                onClick={() => { deletePopUp(index) }}
                className='w-4 h-4 absolute right-0 top-2 rounded-full border cursor-pointer text-center'
            >
                X
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd" />
            </svg>
            <p className='text-red-500 font-bold text-center -mt-1'>{message}</p>
        </div>
    )
}
