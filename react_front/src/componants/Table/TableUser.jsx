import React, { useState } from 'react'
import { useContext } from 'react';
import userContext from '../../Context/userContext';

export const TableUser = ({ users, userSelected, handleUserSelection, selectAllUsers, deselectAllUsers, handleSelectAllChange, handleSearch, loading, banUser, OpenModal }) => {
    const [toogle, setToogle] = useState(false)
    const { userAuth } = useContext(userContext);
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
                            User ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rôle
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users ?

                        users.map((user, index) => {

                            return user._id !== userAuth.userId ? (

                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >


                                    <th scope="row" className="px-2 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user._id === undefined ? "NA" : user._id}
                                    </th>

                                    <td className="px-2 py-2 md:px-6 md:py-4">
                                        {user.email}

                                    </td>
                                    <td className="px-2 py-2 md:px-6 md:py-4">
                                        {user.role}

                                    </td>

                                    <td className="px-2 py-2 md:px-6 md:py-4 flex flex flex-col lg:flex-row justify-between">
                                        <a onClick={() => { OpenModal(user._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Modifié</a>
                                        <a onClick={() => { banUser(user._id, user.email) }} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Supprimer</a>
                                    </td>
                                </tr>
                            )
                                : null

                        })
                        :
                        <Loader />
                    }
                </tbody>
            </table>
        </div >
    )

}
