import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import Toast_invalide from '../Toast_invalide/Toast_invalide';
export default function NewsLetter() {

  const [error, setError] = useState("")
  const [succes, setSucces] = useState("")
  const [loading, setLoading] = useState(false)

  const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
    criteriaMode: 'all',
    defaultValues: {
    }
  });
  const mailNewsletter = watch("mailNewsletter");
  const apiUrl = import.meta.env.VITE_API_URL
  const handleForm = async () => {
    try {
      setLoading(true)
      const request = await fetch(`${apiUrl}/user/sub`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email: mailNewsletter })
      })
      console.log(request)
      const response = await request.json()
      console.log(response)

      if (request.status != 201) {
        setError(response.message)

      } else {
        setSucces(response.message)
        console.log(response.message)
      }
    } catch (error) {
      setError("Une erreur est survenu")
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  const deletePopUp = () => {
    setError("")
  }
  return (

    <div className='sm:col-span-4 lg:col-span-3 p-5 max-h-[200px] grid content-center bg-slate-400 mb-5 relative'>
      {error &&
        <Toast_invalide message={error} deletePopUp={deletePopUp} />
      }

      {


        loading ?
          <>
            <p className='dark:text-white animate-pulse'>Chargement...</p>
          </>
          :
          <>
            {succes ?

              <>
                <p className='text-green-700 font-bold'>{succes}</p>
              </>
              :
              <>
                <h2 className='text-md md:text-xl'>NewsLetter</h2>
                <form onSubmit={handleSubmit(handleForm)}>
                  <label htmlFor="mailNewsletter">Adresse Email</label>
                  <input {...register('mailNewsletter', {
                    required: "Veuillez remplir ce champs",
                    pattern: {
                      value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                      message: "Veuillez renseigner une adresse email valide"
                    }
                  })} id='mailNewsletter' name='mailNewsletter' className='my-4 p-2 text-sm  w-full' type="mail" placeholder='Entrer votre email' />
                  <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-full' type="submit" placeholder='Envoyer'>S'inscrire</button>
                  <ErrorMessage
                    errors={errors}
                    name="mailNewsletter"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p style={{ color: "red" }} key={type}>{message}</p>
                      ))
                    }
                  />
                </form>
              </>
            }
          </>
      }
    </div>
  )
}
