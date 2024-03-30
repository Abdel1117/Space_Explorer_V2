import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import Toast_validation from '../Toast_valide/Toast_valide'
export const TableImage = ({ images, imageSelected, handleImageSelection, selectAllImage, deselectAllImage, handleSelectAllChange, handleSearch, loading, deleteArticle }) => {

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
                    {images ?

                        images.map((image, index) => {

                            return (

                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >


                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                                        {image.image === undefined ? "NA" : image.image}
                                    </th>

                                    <td className="px-2 py-2 md:px-6 md:py-4 ">
                                        {image.Slugs.join(", ")}

                                    </td>


                                    <td className="px-2 py-2 md:px-6 md:py-4 flex flex-col lg:flex-row justify-between">
                                        <a onClick={() => { navigate(`/editImage/${image._id}`) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Modifié</a>
                                        <a onClick={() => { deleteArticle(image._id) }} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Supprimer</a>
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
