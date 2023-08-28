import { React, useState, useEffect, useContext } from 'react'
import userContext from '../../Context/userContext'
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form'
export const Ajout_Sujet = () => {
    const { userAuth } = useContext(userContext)
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',

    });

    const handleForm = () => {
        console.log("Hello World !")
    }

    useEffect(() => {
        userAuth === undefined || userAuth === null ? console.log("noob") : console.log("gg")
    }, [])

    return (
        <section className='min-h-screen flex flex-col items-center'>
            <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'>Ajout Sujet</h1>
            <div className='w-11/12 md:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg px-4 py-14 my-8 mx-2 md:mx-0 shadow-md '>
                <form onSubmit={handleSubmit(handleForm)} method="post">

                    <div className="mb-6">
                        <input
                            {...register('Forum_title', {
                                required: "Veuillez remplir ce champs avec un Titre",
                                pattern: {
                                    value: /^(?! )[a-zA-Z0-9\-()À-ÿ ]{3,18}(?<! )$/,
                                    message: "Veuillez taper un titre qui contient 3 à 20 caractères"
                                }
                            })}

                            type="text"
                            name="Forum_title"
                            id="Forum_title"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Titre du sujet"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="Forum_title"
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className='text-red-700 dark:text-white text-sm md:text-base ml-1 md:ml-0' key={type}>{message}</p>
                                ))
                            }
                        />
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
                                required: "Veuillez taper votre sujet ici",
                                pattern: {
                                    value: /^(?! )[\s\S]{9,}(?<! )$/,
                                    message: "Veuillez donner plus d'information pour que les gens puisse vous comprendre !"
                                }
                            })}
                        ></textarea>


                        <ErrorMessage
                            errors={errors}
                            name="Sujet"
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className='text-red-700 dark:text-white text-sm md:text-base ml-1 md:ml-0' key={type}>{message}</p>
                                ))
                            }
                        />



                    </div>
                    <div className='mb-6'>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Ajouter Sujet</button>
                    </div>
                </form>
            </div>


        </section>
    )
}
