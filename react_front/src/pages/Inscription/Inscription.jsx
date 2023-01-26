import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";


import { useState, useEffect } from 'react'
export default function Inscription() {

    const { register, formState: { errors }, handleSubmit, getValues, watch } = useForm({
        criteriaMode: 'all',
    });
    const [form, setForm] = useState([])
    const [loading, setLoading] = useState();
    const [loadingEnded, setLoadingEnded] = useState();
    const [errorsMessages, setErrorsMessages] = useState();




    const handleChange = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setForm(values => ({ ...values, [name]: value }))
    }

    const handleForm = () => {
        console.log(form)
        fetch("http://localhost:4000/inscription", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (

        <section className="flex justify-center items-center min-h-screen">
            <div className='flex flex-col md:flex-row w-full m-3 md:m-0 md:w-9/12 min-h-[700px] '>

                <div className='bg-hero-form bg-cover bg-center bg-no-repeat invisible md:visible md:w-6/12 rounded-l-md'></div>


                <div className='bg-gradient-to-b from-[#24c6dc] to-[#1a1e96] w-full md:w-6/12 min-h-[600px] flex flex-col items-center justify-center rounded-r-md'>

                    <h1 className='text-xl xl:text-2xl animate-pulse text-white mb-10'>Rejoindre la communauté de Space Explorer</h1>
                    <form onSubmit={handleSubmit(handleForm)} method="POST" className="space-y-4 md:space-y-6 w-9/12 mx-auto" >
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input {...register('emailInput', {
                                required: "Veuillez remplir ce champs",
                                pattern: {
                                    value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                                    message: "Veuillez renseigner une adresse email valide"
                                }
                            })}
                                onChange={handleChange}
                                value={form.email}
                                type="email"
                                required=""
                                name="emailInput"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:shadow-input_neupho"
                                placeholder="name@company.com"

                            />
                            <ErrorMessage
                                errors={errors}
                                name="emailInput"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p style={{ color: "red" }} key={type}>{message}</p>
                                    ))
                                }
                            />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                {...register('passwordInput', {
                                    required: "Veuillez remplir ce champs",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Veuillez tapez un mot de passe valide "
                                    }
                                })}
                                onChange={handleChange}
                                value={form.password}
                                type="password"
                                name="passwordInput"
                                id="password"
                                placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:shadow-input_neupho"
                                required=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="passwordInput"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p style={{ color: "red" }} key={type}>{message}</p>
                                    ))
                                }
                            />
                        </div>
                        <div>
                            <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input
                                {...register('confirm_passwordInput',
                                    {
                                        required: "Veuillez remplir ce champs",
                                        validate: (val) => {
                                            if (watch('passwordInput') !== val) {
                                                return "Vos mots de passe ne match pas !";
                                            }
                                        },
                                    }
                                )}
                                onChange={handleChange}
                                value={form.confirm_password}
                                type="password"
                                name="confirm_passwordInput"
                                id="confirm_ password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:shadow-input_neupho" required="" />
                            <ErrorMessage
                                errors={errors}
                                name="confirm_passwordInput"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p style={{ color: "red" }} key={type}>{message}</p>
                                    ))
                                }
                            />

                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleChange} name="accept"
                                    {...register('accept', {
                                        required: "Veuillez accepter nos conditions d'utilisation",

                                    })} value={form.accept} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />

                            </div>

                            <div className="ml-3 text-sm">
                                <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>

                        </div>
                        <div className='relative bottom-4'>
                            <ErrorMessage
                                errors={errors}
                                name="accept"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p style={{ color: "red" }} key={type}>{message}</p>
                                    ))
                                }
                            />
                        </div>
                        <button type="submit" className="w-full text-white bg-violet-600 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Crée votre compte</button>
                        <p className="text-sm  text-white ">
                            Vous possédez déja un compte ? <a href="/connexion" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez vous ici </a>
                        </p>
                    </form>
                </div>


            </div>

        </section>

    )
}
