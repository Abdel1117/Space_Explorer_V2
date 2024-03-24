import React, { useEffect, useState } from 'react'
import Table from '../Table/Table';
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import Toast_invalide from '../Toast_invalide/Toast_invalide';
import { useNavigate } from 'react-router-dom';


export default function Articles() {
  const [loading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filtre, setFiltre] = useState(null);
  const [articleSelected, setArticleSelected] = useState([])
  const [dataChanged, setDataChanged] = useState(false)
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;


  const findArticle = async (result) => {

    try {
      setIsLoading(true)
      const data = await fetch(`${apiUrl}/article/searchArticle`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ query: result }),
        headers: { "Content-Type": "application/json" }
      })

      const articles = await data.json()
      setArticles(articles)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    // Filtrer les articles en fonction de la correspondance de la recherche
    const result = e.target.value
    findArticle(result)
  }



  const handleArticleSelection = (index) => {
    setArticleSelected(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    })
  }

  const selectAllArticle = () => {
    const allIndices = articles.map((_, index) => index);

    setArticleSelected(allIndices);
  }

  const deselectAllArticles = () => {
    setArticleSelected([]);
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllArticle();
    }
    else {
      deselectAllArticles();
    }
  }



  useEffect(() => {
    const getArticle = async () => {
      setIsLoading(true)
      try {
        const data = await fetch(`${apiUrl}/article`, {
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
  }, [dataChanged])

  const deleteArticle = async (id, title) => {

    const windowsConfirm = window.confirm(`Voullez vous supprimez l'article sur : ${title}`)
    if (windowsConfirm) {

      try {
        setIsLoading(true)
        const request = await fetch(`${apiUrl}/article/deleteArticle/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${sessionStorage.getItem('token')}` },
            credentials: "include"
          })


        const data = await request.json()
        if (request.status === 200) {
          setDataChanged(true)

        } else {
          Toast_invalide("Une erreur lors de la suppression de l'article est survenu")
        }
      } catch (error) {
        Toast_invalide("Une erreur innatendu est survenu")
        console.log(error)
      }
      finally {
        setIsLoading(false)
      }
    }
  }
  return (
    <section className='w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>

      <div className='w-[350px] md:w-full bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-[400px] sm:h-60'>
        <h2 className='text-white p-6 font-semibold z-10 '>
          Publié un nouvel Article
        </h2>

        <a onClick={() => { navigate("/ajouterArticle") }} className='bg-white text-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded-full ml-6 absolute bottom-4 cursor-pointer' >Publier une Nouvel Article</a>
        <img className='w-64 h-auto object-cover bg-transparent absolute sm:top-0 sm:right-0 ' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
      </div>

      <div className=''>
        <Table
          articles={articles}
          articleSelected={articleSelected}
          handleArticleSelection={handleArticleSelection}
          selectAllArticle={selectAllArticle}
          deselectAllArticles={deselectAllArticles}
          handleSelectAllChange={handleSelectAllChange}
          handleSearch={handleSearch}
          loading={loading}
          deleteArticle={deleteArticle}
        />

      </div>

    </section>
  )
}
