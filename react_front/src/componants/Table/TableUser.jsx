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
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    onChange={handleSelectAllChange}
                                    checked={userSelected.length === users.length}
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>

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
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input onChange={() => handleUserSelection(index)} id="checkbox-table-search-1"
                                                type="checkbox"
                                                checked={userSelected.includes(index)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>

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
