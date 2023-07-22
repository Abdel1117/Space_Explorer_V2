import React from 'react'
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";

export default function Images() {


  return (
    <section className=' w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>

      <div className='bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-[400px] sm:h-60'>
        <h2 className='text-white p-6 font-semibold z-10 '>
          Publié une ou des nouvelles Images
        </h2>


        <a href="/ajouterImage" className='bg-white text-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded-full ml-6 absolute bottom-4' >Publié une nouvelle image</a>
        <img className='w-64 h-auto object-cover bg-transparent absolute sm:top-0 sm:right-0 ' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
      </div>

    </section>
  )
}
