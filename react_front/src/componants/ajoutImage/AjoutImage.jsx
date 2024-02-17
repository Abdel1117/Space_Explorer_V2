import React, { useState, useRef, useEffect } from 'react'
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
    const [images, setImages] = useState(null);
    const [imageDes, setImageDes] = useState("");
    const [Slug, setSlug] = useState([]);
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
                    if (img.width > 1200 && img.height > 900) {
                        const myImage = URL.createObjectURL(e.target.files[0])
                        setImagePreShow(myImage);
                        setImages(
                            file
                        );
                    } else {

                        setErrorMessage("Veuillez mettre une image qui à une dimention de au moins 1200 pixels sur 900")
                        setImagePreShow()
                        setImages(null)
                    }
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);

        }
    };
    const countingChar = () => {
        let value = imageDes
        return value.length
    }
    const deletePopUp = () => {
        const newState = ""
        setErrorMessage(newState)
    }
    const resetAll = () => {
        setMessage("")
        setErrorMessage("")
        setImages(null)
        setImageDes("")
        setImagePreShow()
        setIsLoading(false)

        const FormElement = formRef.current;
        FormElement.reset()
    }
    /* Handling Form Input */
    const handleSlugChange = (e) => {
        const slug = e.target.name;
        const checked = e.target.checked;

        if (checked) {
            setSlug((prevSlug) => [...prevSlug, slug]);

        } else {
            setSlug((prevSlug) => prevSlug.filter((prevSlug) => prevSlug !== slug))
        }

        setValue('Slug', (prevSlug) => {
            if (checked) {
                return [...prevSlug, slug];
            } else {
                return prevSlug.filter((prevSlug) => prevSlug !== slug);
            }
        });
    }
    const handleImageUpload = async () => {
        setIsLoading(true)
        try {

            const formData = new FormData();

            formData.append("image", images);
            formData.append("image_desc", JSON.stringify(imageDes));
            formData.append("Slug", JSON.stringify(Slug))
            const apiUrl = import.meta.env.VITE_API_URL;

            useFetch(`${apiUrl}/ajoutImage`, "POST", formData)
                .then(response => {
                    if (response.status === 201) {
                        setMessage(response?.data?.message)
                        setSlug([])
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

                    <div className="mb-6">
                        <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                        <fieldset className=' grid grid-cols-2 justify-items-start'>
                            <legend className="text-sm md:text-md dark:text-white">Choisisez au moins une catégorie </legend>

                            <div>
                                <input
                                    className=''
                                    type="checkbox"
                                    id="Planète"
                                    {...register('Slug', { required: true })}
                                    name="Planète"
                                    value="Planète"
                                    onChange={handleSlugChange}
                                    checked={Slug.includes('Planète')}
                                />
                                <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Planète">Planète</label>
                            </div>

                            <div>
                                <input
                                    className=''
                                    type="checkbox"
                                    id="Systeme_Solaire"
                                    {...register('Slug', { required: true })}
                                    checked={Slug.includes('Systeme Solaire')}
                                    name="Systeme Solaire"
                                    value="Systeme Solaire"
                                    onChange={handleSlugChange}

                                />
                                <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Systeme_Solaire">Système Solaire</label>
                            </div>

                            <div>
                                <input
                                    className=''
                                    type="checkbox"
                                    id="Objet Stélaire"
                                    {...register('Slug', { required: true })}
                                    name="Objet Stélaire"
                                    value="Objet Stélaire"
                                    onChange={handleSlugChange}
                                    checked={Slug.includes('Objet Stélaire')}

                                />
                                <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Objet Stélaire">Objet Stélaire</label>
                            </div>

                            <div>
                                <input
                                    className=''
                                    type="checkbox"
                                    id="Etoile"
                                    {...register('Slug', { required: true })}
                                    name="Etoile"
                                    value="Etoile"
                                    onChange={handleSlugChange}
                                    checked={Slug.includes('Etoile')}

                                />
                                <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Etoile">Etoile</label>
                            </div>

                            <div>
                                <input
                                    className=''
                                    type="checkbox"
                                    id="Météorite"
                                    {...register('Slug', { required: true })}
                                    name="Météorite"
                                    value="Météorite"
                                    checked={Slug.includes('Météorite')}
                                    onChange={handleSlugChange}

                                />
                                <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Météorite">Météorite</label>
                            </div>
                            <div className=' '>

                                {errors.Slug && (
                                    <p className="dark:text-white font-bold text-red-600 ">Veuillez sélectionner au moins un Slug pour l'article en question</p>
                                )}


                            </div>
                        </fieldset>

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
                            name={`image_desc`}
                            id={`image_desc`}
                            value={imageDes}
                            {...register(`image_desc`,
                                {

                                    required: "Veuillez taper un text court qui puisse décrire l'image afin de facilité l'accésibilté",

                                    pattern: {
                                        value: /^(?! )[a-zA-Z0-9\-()À-ÿ ]{10,40}(?<! )$/,
                                        message: "Veuillez taper une décription avec un minimum de 10 caractères et au maximum de 40 caractères"
                                    }
                                },
                            )}
                            onChange={(e) => setImageDes(e.target.value)}
                        />
                        <>
                            <p className='dark:text-white text-sm md:text-md ml-1 mt-2'>
                                {countingChar(imageDes)} / 40
                            </p>
                        </>

                        <>
                            {errors["image_desc"] && (
                                <p className=' text-red-500 font-bold text-sm md:text-md  mt-2'>{errors[`image_desc`]?.message}</p>
                            )}
                        </>
                    </div>
                </div>




                <button onClick={() => { handleSubmit() }} className=' mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Ajouter l'image à la Galerie</button>
            </form>





        </section >
    )
}
