import { React, useState, useEffect, useContext } from 'react'
import userContext from '../../Context/userContext'
import { useForm } from 'react-hook-form'
export const Ajout_Sujet = () => {
    const { userAuth } = useContext(userContext)
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',

    });



    useEffect(() => {
        userAuth === undefined || userAuth === null ? console.log("noob") : console.log("gg")
    }, [])

    return (
        <section className='min-h-screen'>
            <div className='w-[280px] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg p-4 mx-auto'>
                <form action="" method="post">

                    <div className="mb-6">
                        <input
                            {...register('Forum_title', {
                                required: "Veuillez remplir ce champs avec un Titre",
                                pattern: {
                                    value: /^(?! )[a-zA-Z0-9\-()À-ÿ ]{1,18}(?<! )$/,
                                    message: "Veuillez taper un titre qui contient 3 à 20 caractères"
                                }
                            })}

                            type="text"
                            name="Forum_title"
                            id="Forum_title"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Titre du sujet"
                            required />
                        <div className=' '>

                            {
                                errors.Article_title && (

                                    <p>errors</p>
                                )}


                        </div>
                    </div>

                    <div className="mb-6">

                        <textarea
                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                            cols="30"
                            rows="10"
                            name={`Sujet`}
                            id={`Sujet`}
                            placeholder='Ecrivez votre sujet ici'
                            {...register(`Sujet`, {
                                required: "Veuillez taper une section d'article",
                                pattern: {
                                    message: "Veuillez écrire une section d'article avec au minimum 400 charactères et au maximum 1200 charactères"
                                }
                            })}
                        ></textarea>

                        <>
                            {errors[`Sujet`] && (
                                <p className='dark:text-white text-red-600 font-bold text-sm md:text-md ml-1 mt-2'>{errors[`Sujet`]?.message}</p>
                            )}
                        </>

                    </div>
                    <div className='mb-6'>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Ajouter Sujet</button>
                    </div>
                </form>
            </div>


        </section>
    )
}
