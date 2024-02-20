import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import _ from "lodash/fp";
import Toast_invalide from '../Toast_invalide/Toast_invalide';
import Toast_validation from '../Toast_valide/Toast_valide';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../Hooks/useFetch';
export default function FormUser({ user }) {
  const [imageProfil, setImageProfil] = useState(null)
  const [imagePreShow, setImagePreShow] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const userId = useParams();

  const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
    criteriaMode: 'all',

  });
  const apiUrl = import.meta.env.VITE_API_URL
  const dataUser = { user }
  const sendForm = (e) => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("imageProfil", imageProfil)
      const apiUrl = import.meta.env.VITE_API_URL;
      useFetch(`${apiUrl}/user/editAvatar/${userId.id}`, "PUT", formData)
        .then(response => {
          if (response.status === 200) {
            setMessage(response?.data?.message)
          }
          else {
            setError("Une erreur est survenu")
          }
        })

    } catch (error) {
      console.log(error)
      setError("Une erreur est survenu")
    } finally {
      setLoading(false)
    }
  }
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          if (img.width > 300 && img.height > 300) {
            const myImage = URL.createObjectURL(e.target.files[0])
            console.log(myImage)
            setImagePreShow(myImage);
            setImageProfil(
              file
            );
          } else {

            setError("Veuillez mettre une image qui à une dimention de au moins 300 pixels sur 300")
            setImagePreShow()
            setImageProfil([{ imageProfil: "" }])
          }
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file);

    }
  };
  /* Handle the pop up  */
  const deletePopUp = () => {
    const newState = ""
    setError(newState)
  }
  useEffect(() => {
    console.log(dataUser.user)
  }, [])
  return (
    <div className='block w-full '>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0  " >
        {message &&
          <Toast_validation
            message={message}
            options={true}
            doYesAction={setMessage(null)}
            doNoAction={setMessage(null)}
          />
        }
        {error &&
          <Toast_invalide message={error} deletePopUp={deletePopUp} />
        }
        <form onSubmit={handleSubmit(sendForm)} encType="multipart/form-data">
          <h6 className="dark:text-white text-sm pt-4 mb-6 font-bold uppercase px-1 md:px-4">
            Information de l'utilisateur
          </h6>
          <div className='w-full md:w-4/12 my-4 px-1 md:px-4 '>
            <img src={
              imagePreShow != null
                ? imagePreShow
                : dataUser.user.avatar !== undefined
                  ? `${apiUrl}/${dataUser.user.avatar.replace(/\\/g, "/")}`
                  : "../../src/assets/icon_svg/defaultAvatar.jpg"
            } className='mb-2 w-[100px] h-[100px] lg:w-[100px] lg:h-[100px] border-4 dark:border-white rounded-full' alt="Image du profil" />

            <div className=''>
              <input
                className='text-sm lg:text-md dark:text-white w-32'
                type="file"
                name={`imageProfil`}
                id={`imageProfil`}
                {...register(`imageProfil`,
                  {
                    required: "Veuillez insérer une image qui puisse accompagner le paragraphe ",
                    validate: {
                      lessThan10MB: files => {
                        if (files[0]) {
                          if (files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/jpg" && files[0].type !== "image/webp") {

                            return "Nous n'acceptons que les images de type PNG, JPEG, JPG ou Webp"
                          }
                        } else {
                          return "Veuillez insérer une image qui puisse accompagné le paragraphe "
                        }
                      },
                    },
                  })}
                onChange={(e) => handleImageChange(e)}
              />
              <>
                {errors[`imageProfil`] && (
                  <p className=' text-red-500 font-bold text-sm md:text-md  mt-2'>{errors[`imageProfil`]?.message}</p>
                )}
              </>
              <label className='dark:text-white' htmlFor="imageProfil">Télècharger une image de profil</label>
            </div>
          </div>



          <button onClick={() => { handleSubmit() }} type="submit" className="max-w-[100px] ml-4 text-white bg-violet-600 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Envoyer</button>
        </form>
      </div >
    </div >
  )
}
