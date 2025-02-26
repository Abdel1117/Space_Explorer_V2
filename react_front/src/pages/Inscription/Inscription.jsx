import React from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import userContext from '../../Context/userContext';
import { useContext } from 'react';
import _ from "lodash/fp";
import { useState, useEffect } from 'react'
import Toast_valide from '../../componants/Toast_valide/Toast_valide';
import Toast_invalide from '../../componants/Toast_invalide/Toast_invalide';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
    const [form, setForm] = useState([])
    const [loading, setLoading] = useState(false);
    const [succes, setSucces] = useState(false);
    const [errorsMessages, setErrorsMessages] = useState([]);
    const [message, setMessages] = useState("")
    const [checked, setChecked] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { userAuth } = useContext(userContext);
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',
        defaultValues: {
            checkbox: checked
        }
    });

    /**
     * Handling the selection of the field accept_condition
     * @author Abderahmane Adjali
     * @date 2023-01-23
     * @returns {Void}
     */
    const handleCheck = () => {
        setChecked(!checked);
        setForm(value => ({ ...value, ["accept_condition"]: !checked }));
    }

    /**
     * Hanglind the rest of the form field 
     * @author Abderahmane Adjali
     * @date 2023-01-23
     * @param {Event}
     * @returns {Void}
     */
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setForm(values => ({ ...values, [name]: value }))
    }

    const handleForm = () => {
        fetch(`${apiUrl}/user/inscription`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                res.json().then(data => {
                    if (res.status === 201) {
                        setSucces(true)
                        setMessages(data.message)
                        setTimeout(() => {
                            navigate("/connexion")
                        }, 5000);
                    }
                    else {
                        const errorsMsg = []
                        data.errors.forEach(element => {
                            errorsMsg.push(element.msg)
                        });
                        setErrorsMessages(errorsMsg)


                    }
                })
            })

            .catch(err => {
                console.log(err)
                const errorsMsg = ["Une erreur innatendu est survenu"]
                setErrorsMessages(errorsMsg)

            })
    }


    /**
     * Delete the popup via the index
     * @author Abderahmane Adjali
     * @date 2023-01-23
     * @param {Number} index
     * @returns {Void}
     */
    const deletePopUp = index => {
        const newState = [...errorsMessages]
        newState.splice(index, 1)
        setErrorsMessages(newState)
    }
    /**
     * Prevent a user already logged to navigate to this Page
     * @author Abderahmane Adjali
     * @date 2023-01-23
     */
    useEffect(() => {
        if (userAuth != undefined) {
            navigate(`/profil/${userAuth.userId}`)
        }
    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Space Explorer | Inscription`}</title>
                <meta name="description" content="Inscription sur le site Space Explorer" />
            </Helmet>
            {message &&

                <Toast_valide message={message} />

            }
            {
                errorsMessages &&

                <div className='flex flex-col py-1 relative'>

                    {
                        errorsMessages.map((message, index) =>

                            <Toast_invalide key={index} message={message} deletePopUp={deletePopUp} />
                        )
                    }

                </div>
            }
            {succes === true &&
                <p data-testid="succes-message">Inscription Réussi</p>
            }
            <section className="flex flex-col items-center min-h-screen py-5">

                <div className='flex flex-col md:flex-row w-full m-3 md:m-0 md:w-9/12 min-h-[700px] '>

                    <div className='bg-hero-form bg-cover bg-center bg-no-repeat invisible md:visible md:w-6/12 rounded-l-md'></div>


                    <div className='bg-gradient-to-b from-[#24c6dc] to-[#1a1e96] w-full md:w-6/12 min-h-[600px] flex flex-col items-center justify-center rounded-r-md'>

                        <h1 className='text-xl xl:text-2xl animate-pulse text-white mb-10'>Rejoindre la communauté de Space Explorer</h1>
                        <form onSubmit={handleSubmit(handleForm)} method="POST" className="space-y-4 md:space-y-6 w-9/12 mx-auto" >
                            <div>
                                <label htmlFor="pseudo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Pseudo</label>
                                <input {...register('pseudo', {
                                    required: "Veuillez remplir ce champs",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
                                        message: "Veuillez renseigner un pseudo valide"
                                    }
                                })}
                                    onChange={handleChange}
                                    value={form.pseudo}
                                    type="pseudo"
                                    required={true}
                                    name="pseudo"
                                    id="pseudo"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:shadow-input_neupho"
                                    placeholder="MonPseudo123"

                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="pseudo"
                                    render={({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <span role="alert" style={{ color: "red" }} key={type}>{message}</span>
                                        ))
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Email</label>
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
                                    required={true}
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
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                <input
                                    {...register('passwordInput', {
                                        required: "Veuillez remplir ce champs",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Veuillez tapez un mot de passe valide "
                                        }
                                    })}
                                    onChange={handleChange}
                                    required={true}
                                    value={form.passwordInput}
                                    type="password"
                                    name="passwordInput"
                                    id="password"
                                    data-testid="passwordInput"
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:shadow-input_neupho"

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
                                <label htmlFor="confirm_passwordInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer votre mot de passe</label>
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
                                    value={form.confirm_passwordInput}
                                    type="password"
                                    name="confirm_passwordInput"
                                    id="confirm_passwordInput"
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
                                    <input
                                        name="accept_condition"
                                        {...register('accept_condition', {
                                            required: "Veuillez accepter nos conditions d'utilisation",

                                        })}

                                        onChange={handleCheck}
                                        defaultValue={checked}
                                        value={checked}
                                        id="accept_condition"
                                        aria-describedby="accept_condition"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />

                                </div>

                                <div className="ml-3 text-sm">
                                    <label htmlFor="accept_condition" className="font-light text-white dark:text-white">J'accepte les <a className="font-medium (text-white hover:underline dark:text-white cursor-pointer" onClick={() => { navigate("/mentions-legales") }}>Termes et Conditions d'utilisation</a></label>
                                </div>

                            </div>
                            <div className='relative bottom-4'>
                                <ErrorMessage
                                    errors={errors}
                                    name="accept_condition"
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
                                Vous possédez déja un compte ? <a onClick={() => { useNavigate("/connexion") }} className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Connectez vous ici </a>
                            </p>
                        </form>
                    </div>


                </div>

            </section>
        </>
    )
}
