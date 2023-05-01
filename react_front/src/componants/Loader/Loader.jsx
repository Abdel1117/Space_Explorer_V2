import React from 'react'

export default function Loader() {
    return (


        <div className=' absolute bottom-12  left-4' >
            <div class="w-8 h-8 rounded-full absolute border-8 border-solid border-gray-200"></div>

            <div
                class="w-8 h-8 rounded-full animate-spin absolute border-8 border-solid border-black border-t-transparent shadow-md">
            </div>

        </div>
    )
}
