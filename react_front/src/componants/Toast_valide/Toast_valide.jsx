import React, { useState } from 'react'

export default function Toast_validation({ message, options = false, doYesAction, doNoAction }) {

    const [yesClicked, setYesCliked] = useState(false);
    const [noClicked, setNoCliked] = useState(false);


    const handleYesClick = () => {
        setYesCliked(true)
        doYesAction();
    }


    const handleNoClick = () => {
        setNoCliked(true)
        doNoAction();
    }



    return (
        <div className='bg-white border rounded-md shadow-xl min-w-[fit-content] mx-auto p-3 md:p-5 animate-fadeIn fixed bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%] flex flex-col  items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1 text-green-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd" />
            </svg>
            <p className='text-green-500 font-bold text-center -mt-1'>{message}</p>


            {
                options === true &&
                <div className='flex justify-between items-center w-full mt-5 min-w-[280px]'>
                    <button onClick={handleYesClick} className='min-w-[100px] outline-none p-1 rounded-md text-white bg-blue-500'>
                        Oui
                    </button>
                    <button onClick={handleNoClick} className='min-w-[100px] outline-none p-1 rounded-md text-white bg-red-600'>
                        Non
                    </button>
                </div>
            }
        </div>
    )
}
