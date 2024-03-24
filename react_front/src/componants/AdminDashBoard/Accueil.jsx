import React, { useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import Article from "../../assets/icon_svg/un-journal.png"
import Galery from "../../assets/icon_svg/galery.png"
import Subscription from "../../assets/icon_svg/Sub.png"
import User from "../../assets/icon_svg/utilisateur.png"


export default function Accueil(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState({})
    const { blockSection, setBlockSection } = props

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;

        const callApiForCount = async () => {
            try {
                setIsLoading(true)
                const request = await fetch(`${apiUrl}/count/allEntity`, {
                    method: "GET"
                })
                const response = await request.json()
                setCount(response)
            } catch (error) {

            } finally {
                setIsLoading(false)
            }

        }
        callApiForCount()
    }, [])

    return (
        <div className=' w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>

            <div className=' grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>


                <div onClick={() => { setBlockSection("Articles") }} className='cursor-pointer bg-light-blue dark:bg-dark-blue w-full h-[100px] rounded-md flex flex-col justify-between p-2 relative'>
                    <h2 className='text-white font-semibold p-2 '>Total Articles</h2>
                    <img className='absolute top-1 right-0 p-2 w-[50px] h-auto ' src={Article} alt="Icône représentant un article" />
                    {isLoading === true ?
                        <Loader />
                        :
                        <span className='text-white font-semibold p-2'>{count.Articles}</span>
                    }
                </div>


                <div onClick={() => { setBlockSection("Images") }} className='cursor-pointer bg-green-gradient dark:bg-dark-green w-full h-[100px] rounded-md flex flex-col justify-between p-2  relative'>
                    <h2 className='text-white py-2 px-2 font-semibold'>Total Images</h2>
                    <img className='absolute top-1 right-0 p-2 w-[50px] h-auto ' src={Galery} alt="Icône représentant un article" />
                    {isLoading === true ?
                        <Loader />
                        :
                        <span className='text-white font-semibold p-2'>{count.Images}</span>
                    }
                </div>

                <div onClick={() => { setBlockSection("Users") }} className=' cursor-pointer bg-light-violet dark:bg-dark-violet w-full h-[100px] rounded-md flex flex-col  justify-between p-2 relative'>
                    <h2 className='text-white py-2 px-2 font-semibold '>Total Abonnées</h2>
                    <img className='absolute top-1 right-0 p-2 w-[50px] h-auto ' src={Subscription} alt="Icône représentant un article" />
                    {isLoading === true ?
                        <Loader />
                        :
                        <span className='text-white font-semibold p-2'>{count.Sub}</span>
                    }
                </div>

                <div onClick={() => { setBlockSection("Users") }} className=' cursor-pointer bg-azure-radiant dark:bg-dark-azure w-full h-[100px] rounded-md flex flex-col justify-between p-2 relative'>
                    <h2 className='text-white py-2 px-2 font-semibold'>Total Utilisateurs</h2>
                    <img className='absolute top-1 right-0 p-2 w-[50px] h-auto ' src={User} alt="Icône représentant un article" />
                    {isLoading === true ?
                        <Loader />
                        :
                        <span className='text-white font-semibold p-2'>{count.Users}</span>
                    }
                </div>

            </div>


        </div>
    )
}
