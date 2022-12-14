import React from 'react'

export default function NewsLetter() {
  return (
    <div className='col-span-3 p-5 max-h-[200px] grid content-center bg-slate-400'>
        <h2 className='text-md md:text-xl'>NewsLetter</h2>
        <form action="">
            <input className='my-4 p-2' type="mail" placeholder='Entrer votre email' />
            <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full' type="submit" value="" placeholder='Envoyer'>S'inscrire</button>
        </form>
    </div>
  )
}
