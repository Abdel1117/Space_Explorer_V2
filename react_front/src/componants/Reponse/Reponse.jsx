import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import _ from "lodash/fp";

export const Reponse = () => {
    const [reponse, setReponse] = useState("");
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',
    });

    return (
        <section className='w-full mt-4 p-2'>
            <form className="">
                <div className="mb-6">
                    <label htmlFor="Titre_Article" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white ">Votre message</label>
                    <textarea
                        {...register('Article_title', {
                            required: "Veuillez remplir ce champs avec un Titre",
                            pattern: {
                                value: /^(?! )[a-zA-Z0-9\-()À-ÿ ]{1,18}(?<! )$/,
                                message: "Veuillez taper un titre qui contient 3 à 20 caractères"
                            }
                        })}
                        onChange={(e) => { setReponse(e.target.value) }}
                        type="text"
                        name="Article_title"
                        id="Titre_Article"
                        cols="30"
                        rows="10"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Votre message"
                        required ></textarea>
                    <button onClick={() => { handleSubmit() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Repondre</button>
                </div>


            </form>
        </section>
    )
}
