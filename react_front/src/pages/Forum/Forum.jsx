import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import ForumTable from '../../componants/ForumTable/ForumTable'
import Loader from '../../componants/Loader/Loader';
import userContext from '../../Context/userContext';

export default function Forum() {

    const [loading, setIsLoading] = useState(false)
    const [sujets, setSujets] = useState([]);
    const [search, setSearch] = useState("")
    const [errors, setErrors] = useState(false)
    const { userAuth } = useContext(userContext)
    const [columns, setColumns] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL
    /**
     * Call api to get the all the subjects
     * @author Abderahmane Adjali
     * @date 2023-04-11
     * @returns {Void}
     */
    const getForum = async () => {
        const data = await fetch(`${apiUrl}/forum/forum`,
            {
                method: "GET"
            })

        const response = await data.json()
        setSujets(response)
    }
    /**
     * This function is here to search a particular forum by title 
     * @author Abderahmane Adjali
     * @date 2024-03-17
     * @param {String} result
     * @returns {Void}
     */
    const findForum = async (result) => {
        try {
            setIsLoading(true)
            const data = await fetch(`${apiUrl}/forum/searchForum`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ query: result }),
                headers: { "Content-Type": "application/json" }
            })

            const forums = await data.json()
            setSujets(forums)
            setSearch("")
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        try {
            setIsLoading(true)
            setColumns(["Titre", "Slug", "Sujet", "Auteur", "Date"])
            getForum()
        }
        catch (err) {
            setErrors(true)
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }, [])
    return (
        <section className='relative overflow-xauto shadow-md sm:rounded-lg min-h-[400px] p-2 md:p-6'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Forum </title>
                <meta name="description" content="Bienvenu sur le forum de Space Explorer, venez rejoindre une communauté afin de discuter de planète, étoiles, comètes ou autre sujet sur l'espace. " />
            </Helmet>
            <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'>Forum de Space Explorer</h1>
            {errors === true &&

                (<section>

                    <img src="../../assets/images/error.jpg" alt="Une erreur est survenu" />

                </section>)

            }
            <section className='w-full h-[160px] md:h-[250px] mb-10 bg-light-blue dark:bg-dark-blue text-white flex items-center justify-center rounded-md'>
                <div className="relative w-full md:w-8/12 mx-2 ">
                    <div className="absolute inset-y-0 left-0  items-center pl-3 pointer-events-none hidden md:flex">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onKeyDown={(e) => { e.key === "Enter" && findForum(search) }} onChange={(e) => { setSearch(e.target.value) }} type="search" id="default-search" className="block w-full p-4 pl-4 md:pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Chercher un sujet ici" required />
                    <button onClick={(e) => { findForum(search) }} aria-label='Rechercher' type="submit" className="text-white absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 bg-violet-600 hover:bg-green-400  dark:focus:ring-blue-800 text-sm md:text-base">Rechercher</button>
                </div>
            </section>

            {userAuth === null || userAuth === undefined ?


                <section className='w-full md:w-8/12 bg-light-blue dark:bg-dark-blue h-[150px] text-center mb-10 flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md'>
                    <p className='text-sm md:text-base text-white mb-4 md:mb-0'>Veuillez vous inscrire pour pouvoir poster un sujet</p>

                    <a href="/inscription" className='text-white bg-violet-600 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>S'inscrire</a>
                </section>
                :
                <section className='w-full md:w-8/12 bg-light-blue dark:bg-dark-blue h-[150px] text-center mb-10 flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md'>
                    <p className='text-sm md:text-base text-white mb-4 md:mb-0'>Vous n'avez pas trouver votre réponse ? Postez un sujet ! </p>

                    <a href="/ajoutSujet" className='text-white bg-violet-600 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Ouvrir un nouveau sujet</a>
                </section>

            }





            {loading === true && errors === false ?
                <Loader /> :
                <ForumTable columns={columns} datas={sujets} loading={loading} />
            }

        </section>
    )
}
