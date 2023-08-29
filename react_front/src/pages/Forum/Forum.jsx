import React, { useContext, useEffect, useState } from 'react'
import ForumTable from '../../componants/ForumTable/ForumTable'
import Loader from '../../componants/Loader/Loader';
import userContext from '../../Context/userContext';


export default function Forum() {

    const [loading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([]);
    const { userAuth } = useContext(userContext)
    const [columns, setColumns] = useState(new Set())
    const FormData =
    {
        "messages": [
            {
                "auteur": "Alice",
                "date": "2023-07-25 10:15:00",
                "contenu": "Salut tout le monde ! Comment allez-vous ?",
                "status": "Actif"
            },
            {
                "auteur": "Bob",
                "date": "2023-07-25 11:30:22",
                "contenu": "Bonjour, je cherche des conseils pour améliorer mon jardin. Des suggestions ?",
                "status": "Actif"
            },
            {
                "auteur": "Charlie",
                "date": "2023-07-26 14:05:10",
                "contenu": "J'ai récemment lu un bon livre sur l'astronomie. Est-ce que quelqu'un d'autre est passionné par l'espace ?",
                "status": "Actif"
            },
            {
                "auteur": "Alice",
                "date": "2023-07-26 15:20:45",
                "contenu": "@Charlie Oui, l'astronomie est fascinante ! Quel est le titre du livre que tu as lu ?",
                "status": "Actif"
            },
            {
                "auteur": "Eve",
                "date": "2023-07-27 09:00:05",
                "contenu": "Je suis nouvelle ici. Salut à tous !",
                "status": "Actif"
            },
            {
                "auteur": "Charlie",
                "date": "2023-07-27 10:30:18",
                "contenu": "Bienvenue, Eve ! Nous sommes ravis de t'accueillir sur le forum.",
                "status": "Actif"
            },
            {
                "auteur": "Admin",
                "date": "2023-07-27 12:45:55",
                "contenu": "Bonjour à tous, veuillez noter qu'une maintenance du forum est prévue demain matin.",
                "status": "Annonce"
            },
            {
                "auteur": "Alice",
                "date": "2023-07-28 08:10:30",
                "contenu": "@Admin Merci pour l'annonce ! À quelle heure commencera la maintenance ?",
                "status": "Actif"
            },
            {
                "auteur": "Admin",
                "date": "2023-07-28 08:25:15",
                "contenu": "@Alice La maintenance débutera à 9h du matin. Elle devrait durer environ une heure.",
                "status": "Actif"
            },
            {
                "auteur": "Bob",
                "date": "2023-07-28 09:30:40",
                "contenu": "@Admin Parfait, merci pour l'information !",
                "status": "Actif"
            }
        ]
    }


    useEffect(() => {
        try {
            setIsLoading(true)
            const tempColumns = new Set()
            const tempPosts = [];
            FormData.messages.forEach((message) => {
                tempPosts.push(message)
                Object.keys(message).forEach((col) => {
                    tempColumns.add(col)
                })
            })
            setColumns((prevColumns) => new Set([...prevColumns, ...tempColumns]));

            setPosts((prevPosts) => [...prevPosts, ...tempPosts]);
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }, [])
    return (
        <section className='relative overflow-x-auto shadow-md sm:rounded-lg min-h-[400px] p-2 md:p-6'>
            <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'>Forum de Space Explorer</h1>

            <section className='w-full h-[160px] md:h-[250px] mb-10 bg-light-blue dark:bg-dark-blue text-white flex items-center justify-center rounded-md'>
                <div className="relative w-full md:w-8/12 mx-2 ">
                    <div className="absolute inset-y-0 left-0  items-center pl-3 pointer-events-none hidden md:flex">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-4 md:pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Chercher un sujet ici" required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 bg-violet-600 hover:bg-green-400  dark:focus:ring-blue-800 text-sm md:text-base">Rechercher</button>
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





            {loading === true ?
                <Loader /> :
                <ForumTable columns={columns} datas={posts} loading={loading} />
            }

        </section>
    )
}