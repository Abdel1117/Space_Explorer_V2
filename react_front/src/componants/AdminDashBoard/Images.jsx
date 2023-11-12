import React, { useState, useEffect } from 'react'
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";
import Table from '../Table/Table';
export default function Images() {

  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [articleSelected, setArticleSelected] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true)
      try {
        const data = await fetch(`${apiUrl}/getImage`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application-json" }
        })
        const images = await data.json()
        setImages(images)

      } catch (error) {

        console.log(error)
      }
      finally {
        setIsLoading(false)
      }
    }
    getImages()
  }, [])


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


  const deleteArticle = async () => {
    const selectedArticle = articleSelected.map(index => articles[index]._id)

    try {
      setIsLoading(true)
      const response = await fetch(`${apiUrl}/deleteArticle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: selectedArticle })
        })
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }
  return (
    <section className=' w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>

      <div className='bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-[400px] sm:h-60'>
        <h2 className='text-white p-6 font-semibold z-10 '>
          Publié une ou des nouvelles Images
        </h2>


        <a href="/ajouterImage" className='bg-white text-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded-full ml-6 absolute bottom-4' >Publié une nouvelle image</a>
        <img className='w-64 h-auto object-cover bg-transparent absolute sm:top-0 sm:right-0 ' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
      </div>
      <div>
        <Table
          articles={images}
          articleSelected={articleSelected}
          handleArticleSelection={handleArticleSelection}
          selectAllArticle={selectAllArticle}
          deselectAllArticles={deselectAllArticles}
          handleSelectAllChange={handleSelectAllChange}
          handleSearch={handleSearch}
          loading={isLoading}
        />
      </div>
    </section>
  )
}
