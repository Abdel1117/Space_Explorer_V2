import React from 'react'
import Loader from '../Loader/Loader'
import { truncate } from '../../Functions/TextRendering/truncate';
export default function ForumTable({ columns, datas, loading }) {
    return (
        <div className='mb-[100px]'>
            {loading === true ? (
                <Loader />
            ) : (

                <table className="w-full md:w-8/12 text-sm text-left text-gray-500 dark:text-gray-400 md:table-fixed rounded-md" >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  shadow-lg dark:shadow-none">
                        <tr>

                            {columns && Array.from(columns).map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {col}
                                </th>
                            ))}

                        </tr>
                    </thead>
                    <tbody className=' shadow-lg dark:shadow-none '>
                        {datas &&
                            datas.map((data, index) => (
                                <tr
                                    key={index}
                                    className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >

                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {data.auteur}
                                    </td>

                                    <td className="px-6 py-4">{data.date}</td>

                                    <td className="px-6 py-4">{truncate(data.contenu, 10)}</td>
                                    <td className="px-6 py-4">{data.status}</td>

                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
