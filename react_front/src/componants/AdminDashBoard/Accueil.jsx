import React from 'react'

export default function Accueil() {
  return (
    <div className=' w-full h-full shadow-lg bg-white dark:bg-[#252525] p-2 md:p-5'>
         <h2 className='dark:text-white text-black'>Accueil</h2>
        
        <div className=' grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
            <div className='bg-yellow_to_orange w-full h-[100px] rounded-md flex flex-col p-2 justify-between'>
                <h2 className='text-white   '>Total Articles</h2>
                <span>12</span>
            </div>
            <div className='bg-green-gradient w-full h-[100px] rounded-md'>
                <h2 className='text-white py-2 px-2 '>Total Images</h2>
            </div>
            <div className='bg-red-900 w-full h-[100px] rounded-md'>
                <h2 className='dark:text-white text-black py-2 px-2 '>Total Abonnées</h2>
            </div>
            <div className='bg-red-900 w-full h-[100px] rounded-md'>
                <h2 className='dark:text-white text-black py-2 px-2 '>Total Utilisateurs</h2>
            </div>

        </div>
    </div>
  )
}
