import React from 'react'
import LockedIcon from "../../assets/images/LockedIcon.png"

export const Locked = () => {
    return (
        <section className='rounded-lg mx-auto w-9/12 p-8 md:w-[800px] min-h-[400px] bg-light-blue dark:bg-dark-blue'>

            <img className='max-w-[300px] lg:max-w-[400px] h-auto mx-auto ' src={LockedIcon} alt='Icone de verrou' />
            <h2 className=" text-white text-xl md:text-3xl text-center mt-10 font-bold">Vous devez être connecter pour pouvoir faire un don</h2>

        </section>
    )
}
