import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import _ from "lodash/fp";
import userContext from '../../Context/userContext';

export const Reponse = ({ sujetId }) => {
    const [reponse, setReponse] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL
    const { userAuth } = useContext(userContext)
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',
    });

    const handleSubmitResponse = async () => {
        try {

            const request = await fetch(`${apiUrl}/ajoutReponse/${sujetId.id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application-json",
                    "authorization": `Bearer ${sessionStorage.getItem(" token")}`
                },
                body: JSON.stringify({
                    "ForumId": sujetId.id,
                    "user": userAuth.userId,
                    "response_content": reponse,
                })
            })

            const responseServer = await request.json();

            if (responseServer.ok) {
                console.log(responseServer)
            }
            else {
                console.log(responseServer)
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log("Traitement fini ....")
        }
    }

    return (
        <section className='w-full lg:w-8/12 mt-4 p-2'>
            <form onSubmit={handleSubmit(handleSubmitResponse)} className="">
                <div className="mb-6">
                    <label htmlFor="Titre_Article" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white ">Votre message</label>
                    <textarea
                        {...register('response_content', {
                            required: "Veuillez remplir ce champs avec un Titre",

                        })}
                        onChange={(e) => { setReponse(e.target.value) }}
                        type="text"
                        name="response_content"
                        id="response_content"
                        cols="40"
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
