import React from 'react'
import Loader from '../Loader/Loader'
import { truncate } from '../../Functions/TextRendering/truncate';
export default function ForumTable({ columns, datas, loading }) {
    return (
        <div>
            {loading === true ? (
                <Loader />
            ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            {columns && Array.from(columns).map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {col}
                                </th>
                            ))}
                            <th scope='col' className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas &&
                            datas.map((data, index) => (
                                <tr
                                    key={index}
                                    className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-table-search-${index}`}
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor={`checkbox-table-search-${index}`}
                                                className="sr-only"
                                            >
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {data.auteur}
                                    </td>

                                    <td className="px-6 py-4">{data.date}</td>

                                    <td className="px-6 py-4">{truncate(data.contenu, 10)}</td>
                                    <td className="px-6 py-4">{data.status}</td>
                                    <td className="px-6 py-4 flex justify-between">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Modifié
                                        </a>
                                        <a
                                            href="#"
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Supprimer
                                        </a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
