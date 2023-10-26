import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useFetch } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";
import Toast_validation from '../Toast_valide/Toast_valide';
import Toast_invalide from '../Toast_invalide/Toast_invalide';
import Upload from "../../assets/icon_svg/upload.png"

export default function AjoutImage() {
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [images, setImages] = useState();
    const [imageDes, setImageDes] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [imagePreShow, setImagePreShow] = useState();
    const navigate = useNavigate()
    const formRef = useRef(null);
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',

    });
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    if (img.width > 1200 && img.height > 920) {
                        const myImage = URL.createObjectURL(e.target.files[0])
                        setImagePreShow(myImage);
                        setImages(
                            file
                        );
                    } else {

                        setErrorMessage("Veuillez mettre une image qui à une dimention de au moins 1200 pixels sur 920")
                        setImagePreShow()
                        setImages([{ image: "" }])
                    }
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);

        }
    };
    const countingChar = () => {
        let value = imageDes
        let counterValue = value.replace(/\s/g, "");
        return counterValue.length
    }
    const deletePopUp = () => {
        const newState = ""
        setErrorMessage(newState)
    }
    const resetAll = () => {
        setMessage("")
        setErrorMessage("")
        setImages()
        setImageDes("")
        setImagePreShow()
        setIsLoading(false)

        const FormElement = formRef.current;
        FormElement.reset()
    }

    const handleImageUpload = async () => {
        setIsLoading(true)
        try {

            const formData = new FormData();

            formData.append("image", images);
            formData.append("image_desc", imageDes);
            const apiUrl = import.meta.env.VITE_API_URL;

            useFetch(`${apiUrl}/ajoutImage`, "POST", formData)
                .then(response => {
                    if (response.status === 201) {
                        setMessage(response?.data?.message)
                    }
                    else {
                        setErrorMessage("Une erreur est survenu")
                    }
                })
        } catch (error) {
            console.log(error);
            setErrorMessage("Une erreur est survenu")

        }
        finally {
            setIsLoading(false)
        }
    }

    const handleForm = () => {
        handleImageUpload();
    }

    return (


        <section className=''>
            {message &&
                <Toast_validation
                    message={message}
                    options={true}
                    doYesAction={resetAll}
                    doNoAction={() => { location.href = "/dashBoard" }}
                />
            }
            {errorMessage &&
                <Toast_invalide message={errorMessage} deletePopUp={deletePopUp} />
            }

            <form ref={formRef} onSubmit={handleSubmit(handleForm)} encType="multipart/form-data" method='POST' className="w-[10/12] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white shadow-lg dark:bg-dark-blue rounded-lg p-4  mx-2 md:mx-auto my-20 flex justify-center items-center flex-col text-center">
                <div className='mx-auto'>
                    <img className='min-w-[100px] min-h-auto w-[120px] h-auto object-cover  mx-auto' src={`${Upload}`} alt="" />
                </div>
                <div >
                    <div className='mt-5 ml-1'>

                        <label className='dark:text-white mr-2 text-sm md:text-base '
                            htmlFor={`Image`}>Image</label>
                        <input
                            className='block w-full dark:text-white text-xs md:text-base '
                            type="file"
                            name={`Image`}
                            id={`Image`}
                            {...register(`Image`,
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
                            {errors[`Image`] && (
                                <p className=' text-red-500 font-bold text-sm md:text-md  mt-2'>{errors[`Image`]?.message}</p>
                            )}
                        </>
                    </div>
                    {/* Display of the image */}

                    {imagePreShow && (

                        <div className='mt-5 '>
                            <img className='w-[280px] h-auto object-cover md:w-[580px]' src={imagePreShow} alt="" />

                        </div>
                    )}

                    <div className='mt-5 '>
                        <label
                            className='dark:text-white text-sm md:text-base '
                            htmlFor={`Image_Desc`}>
                            Description de l'image pour l'accésibilté en quelque mots
                        </label>

                        <input
                            className="text-sm md:text-base border-black border rounded-lg p-2 mt-2 w-full"
                            type="text"
                            name={`Image_Desc`}
                            id={`Image_Desc`}
                            value={imageDes}
                            {...register(`Image_Des`,
                                {

                                    required: "Veuillez taper un text court qui puisse décrire l'image afin de facilité l'accésibilté",

                                    pattern: {
                                        value: /^(?! )[a-zA-Z0-9\-()À-ÿ ]{10,30}(?<! )$/,
                                        message: "Veuillez taper une décription avec un minimum de 10 caractères et au maximum de 30 caractères"
                                    }
                                },
                            )}
                            onChange={(e) => setImageDes(e.target.value)}
                        />
                        <>
                            <p className='dark:text-white text-sm md:text-md ml-1 mt-2'>
                                {countingChar(imageDes)} / 30
                            </p>
                        </>

                        <>
                            {errors["Image_Desc"] && (
                                <p className=' text-red-500 font-bold text-sm md:text-md  mt-2'>{errors[`Image_Desc_${index}`]?.message}</p>
                            )}
                        </>
                    </div>
                </div>




                <button onClick={() => { handleSubmit() }} className=' mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Ajouter l'image à la Galerie</button>
            </form>





        </section >
    )
}
