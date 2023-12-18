import React from 'react'

export const Spinner = () => {
    return (
        <section className='relative min-h-screen bg-[#F5F5F5] dark:bg-[#252525]'>

            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
        </section>
    )
}
