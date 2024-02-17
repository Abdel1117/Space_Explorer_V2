import React from 'react'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import ModalImage from "react-modal-image"
export default function Galerie() {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const numberOfDivs = 20

  function fetchData() {
    setLoad(true)
    fetch(`${apiUrl}/getImage`, {
      method: 'GET'

    })

      .then(async (response) => {
        const data = await response.json();
        setData(data);
        setLoad(false);

      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = (image) => {
    setSelectedImage(null)
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Space Explorer | Galerie </title>
        <meta name="description" content="Bienvenu sur la page dédier au image de Space Explorer, ici vous pourez observer des planète, étoiles, comètes, vaiseau et autres magnifique cliché veanant de l'espace" />
      </Helmet>
      <section className=' min-h-[100vh] w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2 pb-12'>
        <h1>Galerie</h1>
        {load === true ?

          Array(numberOfDivs).fill().map((_, i) => {
            return <div key={i} className='animate-pulse h-[300px] w-full bg-slate-400 rounded-lg'></div>

          })

          :
          data && data.map((image, id) =>
            <ModalImage
              onClick={on => { openModal(image) }}
              loading='lazy'
              className='min-w-full h-[300px] hover:opacity-70 hover:cursor-pointer object-cover rounded-lg '
              key={id}
              small={`${apiUrl}/${image.image.replace(/\\/g, "/")}`}
              large={`${apiUrl}/${image.image.replace(/\\/g, "/")}`}
              alt={`${image.imageDesc}`}

            />
          )
        }


      </section>


    </>
  )
} 
