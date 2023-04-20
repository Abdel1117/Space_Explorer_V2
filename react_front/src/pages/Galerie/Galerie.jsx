import React from 'react'
import { useState, useEffect } from 'react'
export default function Galerie() {

  const [data, setData] = useState([]);
  const [images, setNumberImage] = useState(10);
  const [load, setLoad] = useState(false)
  const numberOfDivs = 20
  const setPage = () => {
    setNumberImage(images + 10)
    fetchData()
  }
  function fetchData() {
    setLoad(true)
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${images}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    })

      .then(async (response) => {
        const data = await response.json();

        setData(prevImages => [...prevImages, ...data]);
        setLoad(false);

      })
      .catch(e => console.log(e))
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className=' min-h-[100vh] w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2 pb-12'>
        {load === true ?

          Array(numberOfDivs).fill().map((_, i) => {
            return <div className='animate-pulse h-[300px] w-full bg-slate-400'></div>

          })

          :
          data && data.map((image, id) =>
            <img className='min-w-full h-[300px] hover:opacity-70 hover:cursor-pointer xl:first-of-type:col-span-2 xl:first-of-type:row-span-2 xl:first-of-type:h-full object-fill' key={image.id} src={image.url} />
          )
        }

      </section>

      <div className='mx-auto  py-12 w-[250px] flex justify-between itemx-center'>
        <button className='w-5/12 outline-none border border-purple-600 rounded-lg text-black dark:text-white text-sm hover:border-white hover:dark:text-purple-600 p-1' onClick={setPage}>Plus d'image</button>
        <button className='w-5/12 outline-none border border-purple-600 rounded-lg text-black dark:text-white text-sm hover:border-white hover:dark:text-purple-600 p-1' >Moins d'image</button>
      </div>
    </>
  )
} 
