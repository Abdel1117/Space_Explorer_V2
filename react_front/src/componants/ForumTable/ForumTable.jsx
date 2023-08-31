import React from 'react'
import Loader from '../Loader/Loader'
import { truncate } from '../../Functions/TextRendering/truncate';
import { useNavigate } from 'react-router-dom';
export default function ForumTable({ columns, datas, loading }) {


    const navigate = useNavigate()
    const navigateTo = (path) => {

        navigate(path)
    };
    return (
        <div className='mb-[100px]'>
            {loading === true ? (
                <Loader />
            ) : (
                <table className="w-full md:w-8/12 text-sm text-left text-gray-500 dark:text-gray-400 xl:table-fixed rounded-md" >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 shadow-lg dark:shadow-none">
                        <tr>

                            {columns && Array.from(columns).map((col, index) => (
                                <th key={index} scope="col" className=" px-2 md:px-6 py-2 md:py-3">
                                    {col}
                                </th>
                            ))}

                        </tr>
                    </thead>
                    <tbody className='shadow-lg dark:shadow-none '>
                        {datas &&
                            datas.map((data, index) => (

                                <tr
                                    onClick={() => navigateTo(`/sujet/${data._id}`)}
                                    key={index}
                                    className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >

                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm md:text-base"
                                    >
                                        {data.Title}
                                    </td>

                                    <td className="px-6 py-4 text-sm md:text-base">{data.Slug}</td>

                                    <td className="px-6 py-4 text-sm md:text-base">{truncate(data.Sujet, 10)}</td>
                                    <td className="px-6 py-4 text-sm md:text-base">{data.User.email}</td>
                                    <td className="px-6 py-4 text-sm md:text-base">{data.FormattedDate}</td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
