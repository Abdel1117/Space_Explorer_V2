import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";
import { useState, useEffect } from 'react'
import userContext from '../../Context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Toast_valide from '../../componants/Toast_valide/Toast_valide';
import Toast_invalide from '../../componants/Toast_invalide/Toast_invalide';
import { Helmet } from 'react-helmet';

export default function Connexion() {

  const [form, setForm] = useState([])
  const { setUserAuth, userAuth } = useContext(userContext)
  const [loading, setLoading] = useState(false);
  const [loadingEnded, setLoadingEnded] = useState(false);
  const [errorsMessages, setErrorsMessages] = useState([]);
  const [message, setMessages] = useState("")
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
    criteriaMode: 'all',
    defaultValues: {
    }
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setForm(values => ({ ...values, [name]: value }))
  }

  const handleForm = () => {
    fetch(`${apiUrl}/user/connexion`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
      .then(async res => {
        const data = await res.json();
        if (res.status === 200) {
          setUserAuth(data);
          setMessages(data.message);
          sessionStorage.setItem("token", data.token);
          navigate("/");
        } else {
          let errorsMsg = [];
          if (Array.isArray(data.errors)) {
            errorsMsg = data.errors.map(err => err.msg);
          } else {
            errorsMsg.push(data.errors);
          }
          setErrorsMessages(errorsMsg);
        }
      })
      .catch((err) => {
        console.log(err)
        Toast_invalide("Une erreur est survenu")
      });
  };
  const deletePopUp = index => {
    const newState = [...errorsMessages]
    newState.splice(index, 1)
    setErrorsMessages(newState)
  }

  useEffect(() => {
    if (userAuth != undefined) {
      navigate(`/profil/${userAuth.userId}`)
    }
  }, [])


  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Space Explorer | Connexion `}</title>
        <meta name="description" content="Connecter vous au site Space Explorer afin de pouvoir poster sur le forum et plus encore" />
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

      <section className="flex flex-col items-center min-h-screen pt-8">

        <div className='flex flex-col md:flex-row-reverse w-full m-3 md:m-0 md:w-9/12 min-h-[700px] '>

          <div className='bg-hero-form bg-cover bg-center bg-no-repeat invisible md:visible md:w-6/12 rounded-r-md'></div>


          <div className='bg-gradient-to-b from-[#24c6dc] to-[#1a1e96] w-full md:w-6/12 min-h-[600px] flex flex-col items-center justify-center rounded-l-md'>

            <h1 className='text-xl xl:text-2xl animate-pulse text-white mb-10'>Se connecter</h1>
            <form onSubmit={handleSubmit(handleForm)} method="POST" className="space-y-4 md:space-y-6 w-9/12 mx-auto" >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Votre adresse email</label>
                <input {...register('emailInput', {
                  required: "Veuillez remplir ce champs",
                  pattern: {
                    value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    message: "Veuillez renseigner une adresse email valide"
                  }
                })}
                  onChange={handleChange}
                  value={form.email}
                  type="text"
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
                <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium text-white">Mot de passe</label>
                <input

                  {...register('passwordInput', {
                    required: "Veuillez remplir ce champs",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Veuillez tapez un mot de passe valide "
                    }
                  })}
                  onChange={handleChange}
                  value={form.passwordInput || ""}
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
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
              <button type="submit" className="w-full text-white bg-violet-600 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Connexion</button>
              <p className="text-sm  text-white ">
                Vous n'avez pas de compte ? <a onClick={() => navigate("/")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Crée un compte ici </a>
              </p>
            </form>
          </div>


        </div>

      </section >
    </>
  )
}
