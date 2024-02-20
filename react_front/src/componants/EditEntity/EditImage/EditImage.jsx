import React, { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";
import Toast_validation from '../../Toast_valide/Toast_valide';
import Toast_invalide from '../../Toast_invalide/Toast_invalide';
import Upload from "../../../assets/icon_svg/upload.png"
import Loader from '../../Loader/Loader';
import { useFetch } from '../../../Hooks/useFetch';

export const EditImage = () => {
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [images, setImages] = useState(null);
    const [imageDes, setImageDes] = useState("");
    const [editedSlug, setEditedSlug] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreShow, setImagePreShow] = useState();
    const navigate = useNavigate()
    const formRef = useRef(null);

    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL


    /* UseForm */

    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',

    });

    /* UseEffect to get the Image bu the id in the params */

    useEffect(() => {
        const getImageById = async () => {
            setIsLoading(true)
            try {
                const request = await fetch(`${apiUrl}/image/getImageById/${id}`, { method: "GET" })
                const response = await request.json()
                if (request.status === 200) {
                    setImages(response[0].image)
                    setImagePreShow(response[0].image.replaceAll("/", "\\"))
                    setImageDes(response[0].imageDesc)
                    setEditedSlug(response[0].Slugs)
                } else {
                    setErrorMessage('Une erreure lors de la récupération de votre images')
                }

            }
            catch (err) {
                console.log(err)
                setErrorMessage("Une erreur est survenu lors du chargement de l'article")
            }
            finally {
                setIsLoading(false)
            }
        }
        getImageById()
    }, [])



    /* Handling of image */
    const handleImageChange = (e, index) => {
        setImagePreShow(null)
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
        setImages(null)
        setImageDes("")
        setImagePreShow()
        setEditedSlug([])
        setIsLoading(false)

        const FormElement = formRef.current;
        FormElement.reset()
    }
    /* Handling Form Input */
    const handleSlugChange = (e) => {
        const slug = e.target.name;
        const checked = e.target.checked;

        if (checked) {
            setEditedSlug((prevSlug) => [...prevSlug, slug]);

        } else {
            setEditedSlug((prevSlug) => prevSlug.filter((prevSlug) => prevSlug !== slug))
        }

        setValue('editedSlug', (prevSlug) => {
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
            formData.append("editedSlug", JSON.stringify(editedSlug))


            const apiUrl = import.meta.env.VITE_API_URL;

            fetch(`${apiUrl}/image/editImage/${id}`, { method: "PUT", body: formData })
                .then(response => {
                    if (response.status === 200) {
                        setMessage("Image modifier avec succès, voullez vous en rajouter une autre ?")
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
        <section className='min-h-screen py-20'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Space Explorer | Modification d'image`}</title>
                <meta name="description" content="Modification d'image" />
            </Helmet>
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
            {isLoading ? <Loader />


                :

                <form ref={formRef} onSubmit={handleSubmit(handleForm)} encType="multipart/form-data" method='POST' className="w-[10/12] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white shadow-lg dark:bg-dark-blue rounded-lg p-4  mx-2 md:mx-auto  flex justify-center items-center flex-col text-center ">
                    <div className='mx-auto'>
                        <img className='min-w-[100px] min-h-auto w-[120px] h-auto object-cover  mx-auto' src={`${Upload}`} alt="" />
                    </div>
                    <div>
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
                                        {...register('editedSlug', { required: true })}
                                        name="Planète"
                                        value="Planète"
                                        onChange={handleSlugChange}
                                        checked={editedSlug.includes('Planète')}
                                    />
                                    <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Planète">Planète</label>
                                </div>

                                <div>
                                    <input
                                        className=''
                                        type="checkbox"
                                        id="Systeme_Solaire"
                                        {...register('editedSlug', { required: true })}
                                        checked={editedSlug.includes('Systeme Solaire')}
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
                                        {...register('editedSlug', { required: true })}
                                        name="Objet Stélaire"
                                        value="Objet Stélaire"
                                        onChange={handleSlugChange}
                                        checked={editedSlug.includes('Objet Stélaire')}

                                    />
                                    <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Objet Stélaire">Objet Stélaire</label>
                                </div>

                                <div>
                                    <input
                                        className=''
                                        type="checkbox"
                                        id="Etoile"
                                        {...register('editedSlug', { required: true })}
                                        name="Etoile"
                                        value="Etoile"
                                        onChange={handleSlugChange}
                                        checked={editedSlug.includes('Etoile')}

                                    />
                                    <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Etoile">Etoile</label>
                                </div>

                                <div>
                                    <input
                                        className=''
                                        type="checkbox"
                                        id="Météorite"
                                        {...register('editedSlug', { required: true })}
                                        name="Météorite"
                                        value="Météorite"
                                        checked={editedSlug.includes('Météorite')}
                                        onChange={handleSlugChange}

                                    />
                                    <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Météorite">Météorite</label>
                                </div>
                                <div className=' '>

                                    {errors.editedSlug && (
                                        <p className="dark:text-white font-bold text-red-600 ">Veuillez sélectionner au moins un Slug pour l'article en question</p>
                                    )}


                                </div>
                            </fieldset>

                        </div>
                        {/* Display of the image */}

                        {imagePreShow && (

                            <div className='mt-5 '>
                                <img className='w-[280px] h-auto object-cover md:w-[580px]' src={`${imagePreShow}`} alt="" />

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
                                value={imageDes || ""}
                                {...register(`image_desc`,
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
                                {errors["image_desc"] && (
                                    <p className=' text-red-500 font-bold text-sm md:text-md  mt-2'>{errors[`image_desc`]?.message}</p>
                                )}
                            </>
                        </div>
                    </div>




                    <button onClick={() => { handleSubmit() }} className=' mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Modifier</button>
                </form>

            }



        </section >
    )
}
