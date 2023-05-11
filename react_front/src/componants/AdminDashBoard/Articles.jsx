import React from 'react'
import Article from '../Article/Article';
import Table from '../Table/Table';
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";


const Articles_data = [

{
    titre: "Mon Titre 1", 
    resume : "Mon résumé ",
    categorie : "Espace",
    date : "05/02/2020",
    image : "https://static.cnews.fr/sites/default/files/000_1dn1fw1.jpg"
  },
  
  {
    titre: "Mon Titre 2", 
    resume : "Mon résumé ",
    categorie : "Espace",
    date : "05/03/2022",
    image : "data:image/jpeg;base64,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"
  },
  {
    titre: "Mon Titre 3", 
    resume : "Mon résumé ",
    categorie : "Espace",
    date : "05/03/2023",
    image : "https://www.lactugeek.com/wp-content/uploads/2020/03/mercure-plan%C3%A8te.jpg"
   },
    {
    titre: "Mon Titre 4", 
    resume : "Mon résumé ",
    categorie : "Espace",
    date : "05/03/2023",
    image : "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fhoroscope2.2Fvos-previsions-astro.2Fhoroscope-portrait-planete-saturne-astrologie-52322.2F15044425-1-fre-FR.2Fhoroscope-portrait-de-la-planete-saturne-en-astrologie.2Ejpg/1200x900/quality/80/crop-from/center/horoscope-portrait-de-la-planete-saturne-en-astrologie.jpeg"
  }
]


export default function Articles() {
  return (
    <section className=' w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>

      <div className='bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-60'>
                        <h2 className='text-white p-6 font-semibold '>
                            Publié un nouvel Article
                        </h2>

                        <a className='bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4' href='#'>Ecrire un Nouvel Article</a>
                        <img className='w-44 h-auto object-cover bg-transparent absolute -bottom-4 md:-top-6 md:right-0 ' src={Astronaute_in_front_of_computer} alt="" />
        </div>
                  
      <div className=''>
      <Table />

      </div>

    </section>
  )
}
