import React from 'react'
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";


export default function Amis() {
    return (
        <div>

            <h1 className='dark:text-white text-sm pt-4 mb-6 font-bold uppercase px-1 md:px-4'>Vos Amis</h1>


            <div className='flex flex-col justify-center items-center rounded-full animate-pulse'>
                <img className='w-[350px] h-auto object-cover bg-transparent rounded-full mx-auto' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
                <p className='text-xl dark:text-white'>Développement en cours</p>

            </div>

        </div >
    )
}
