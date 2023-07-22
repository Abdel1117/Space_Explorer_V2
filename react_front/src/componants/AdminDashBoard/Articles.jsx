import React, { useEffect, useState } from 'react'
import Article from '../Article/Article';
import Table from '../Table/Table';
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";
import AjoutArticle from '../AjoutArticle/AjoutArticle';
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Articles() {
  const [loading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState()
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const getArticle = async () => {
      setIsLoading(true)
      try {
        const data = await fetch(`${apiUrl}/`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        })

        const articles = await data.json()

        setArticles(articles)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getArticle();
  }, [])

  return (
    <section className=' w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>

      <div className='bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-[400px] sm:h-60'>
        <h2 className='text-white p-6 font-semibold z-10 '>
          Publié un nouvel Article
        </h2>

        <a href="/ajouterArticle" className='bg-white text-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded-full ml-6 absolute bottom-4' >Publier une Nouvel Article</a>
        <img className='w-64 h-auto object-cover bg-transparent absolute sm:top-0 sm:right-0 ' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
      </div>

      <div className=''>
        <Table articles={articles} loading={loading} />

      </div>

    </section>
  )
}
