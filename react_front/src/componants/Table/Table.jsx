import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
export default function Table({ articles, articleSelected, handleArticleSelection, selectAllImage, deselectAllArticles, handleSelectAllChange, handleSearch, loading, deleteArticle }) {

    const [toogle, setToogle] = useState(false)
    const navigate = useNavigate()
    const myStyle = {
        position: "absolute",
        inset: "40px auto 0px 0px",
        margin: " 0px",
        transhtmlForm: " translate3d(522.5px, 3847.5px, 0px)"
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[400px]">
            <div className="flex items-center justify-between pb-4">

                <label htmlFor="table-search" className="sr-only">Rechercher</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input onChange={handleSearch} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recherchers" />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>


                        <th scope="col" className="px-6 py-3">
                            Titre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Catégorie
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {articles ?

                        articles.map((article, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >


                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {article.Title === undefined ? "NA" : article.Title}
                                    </th>

                                    <td className="px-6 py-4">
                                        {article.Slugs.join(", ")}

                                    </td>


                                    <td className="px-6 py-4 flex  justify-between  flex-col lg:flex-row ">
                                        <a onClick={() => { navigate(`/editSujet/${article._id}`) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Modifié</a>
                                        <a onClick={() => deleteArticle(article._id, article.Title)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Supprimer</a>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <Loader />
                    }
                </tbody>
            </table>
        </div >
    )
}
