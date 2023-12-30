import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import _ from "lodash/fp";
import { Spinner } from '../../Spinner/Spinner';
import Toast_validation from '../../Toast_valide/Toast_valide';
import Toast_invalide from '../../Toast_invalide/Toast_invalide';

export const EditSujet = () => {
    /* Les States sont ici */
    const [article, setArticle] = useState({})
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [editedTitle, setEditedTitle] = useState(null)
    const [editedSlug, setEditedSlug] = useState(null)
    const [editedSections, setEditedSections] = useState(null)
    const [imageHeaderEdited, setImageHeaderEdited] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    /* Local variable Néssecaire */
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    /* useForm */
    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',

    });


    /* useEffect to get the Article by the id in the params */
    useEffect(() => {
        const getArticleById = async () => {
            setIsLoading(true)
            try {
                const request = await fetch(`${apiUrl}/article/${id}`, { method: "GET" })
                const response = await request.json()
                setArticle(response)
                setEditedTitle(response.Title || "")
                setEditedSections(response.Contenu.map(section => ({
                    ...section,
                    image: section.image
                })))
                setEditedSlug(response.Slugs)
            }
            catch (err) {
                console.log(err)
                setErrorMessage("Une erreur est survenu lors du chargement de l'article")
            }
            finally {
                setIsLoading(false)
            }
        }
        getArticleById()
    }, [])
    /* Handling Section  */
    const addSection = () => {
        const nouvelleSection = {
            titre: "",
            contenu: "",
            image: ""
        };

        const updatedSections = [...editedSections, nouvelleSection];
        setEditedSections(updatedSections);

        setValue(`Section_titre${updatedSections.length - 1}`, "");
        setValue(`Section_${updatedSections.length - 1}`, "");
    }
    const deleteLastSection = (index) => {

        const newState = [...editedSections]

        newState.splice(index, 1)
        setEditedSections(newState)
    }
    /* Function to handle the image Change */

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        setEditedSections(prevSections => {
            return prevSections.map((section, idx) => {
                if (idx === index) {
                    return { ...section, image: file || section.image };
                }
                return section;
            });
        });
    };



    const editArticle = async () => {
        setIsLoading(true);
        try {
            const sectionData = editedSections.map((section, index) => {
                // Inclure les identifiants des images existantes pour les conserver
                const { titre, contenu, image } = section;
                console.log(section)
                return { titre, contenu, image };
            });

            const formData = new FormData();
            formData.append("titre", JSON.stringify(editedTitle));
            formData.append("contenu", JSON.stringify(sectionData));
            formData.append("slugs", JSON.stringify(editedSlug));
            console.log(editedSections)
            try {
                editedSections.forEach((section, index) => {
                    console.log(section)
                    console.log(section.image)

                    if (section.image instanceof File) {
                        formData.append(`images`, section.image);
                    } else {
                        if (section.image) {
                            formData.append(`images`, section.image)
                        }
                    }

                });
            } catch (e) {
                console.log(e)
            }
            const request = await fetch(`${apiUrl}/editArticle/${id}`, {
                method: "PUT",
                body: formData
            });

            const response = await request.json();

            if (request.status === 200) {
                setMessage(`${response.message}. Que voulez-vous faire ?`);
            } else {
                setErrorMessage(response.message);
            }
        } catch (err) {
            Toast_invalide(err);
        } finally {
            setIsLoading(false);
        }
    }

    /* Function to close modal pop_up */
    const deletePopUp = () => {
        const newState = ""
        setErrorMessage(newState)
    }
    /* Function to handle the Form Edition */
    const handleForm = async () => {
        editArticle()
    }
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

    /* This function is here to count the charactères */
    const countingChar = (section) => {
        let value = section;
        let counterValue = value.replace(/\s/g, "");
        return counterValue.length
    }

    /* Handle Yes action in Succès Modal */
    const handleYesAction = () => {
        navigate("/dashBoard", { state: { blockSection: "Articles" } })
    }


    /* Handle No action in Fail Modal */
    const handleNoAction = () => {
        navigate(`/article/${id}`)
    }
    return (
        <section className='min-h-screen'>
            {isLoading ?

                (<Spinner />) : (
                    <>
                        <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'> Modification de l'article : {article.Title}</h1>
                        {
                            message &&
                            <Toast_validation message={message} options={true} doYesAction={handleYesAction} doNoAction={handleNoAction} choice1="Revenir au dashboard" choice2="Voir l'article modifier" />
                        }
                        {
                            errorMessage &&
                            <Toast_invalide message={errorMessage} deletePopUp={deletePopUp} />
                        }
                        <form onSubmit={handleSubmit(handleForm)} encType="multipart/form-data" method='POST' className="w-[280px] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg p-4 mx-auto">
                            <div className="mb-6">
                                <label htmlFor="Titre_Article" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">Titre</label>
                                <input

                                    {...register('Article_title', {
                                        required: "Veuillez remplir ce champs avec un Titre",
                                        pattern: {
                                            value: /^(?! )[a-zA-Z0-9\-()À-ÿ ]{1,18}(?<! )$/,
                                            message: "Veuillez taper un titre qui contient 3 à 20 caractères"
                                        }
                                    })}
                                    type="text"
                                    name="Article_title"
                                    id="Titre_Article"
                                    value={editedTitle}

                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"

                                    onChange={(e) => { setEditedTitle(e.target.value) }}
                                    required
                                />
                                <div className=''>

                                    {errors?.Article_title && (

                                        <p className='font-bold text-red-600 '>{errors?.Article_title?.message}</p>)}


                                </div>
                            </div>
                            {/* Slug Area */}
                            <div className="mb-6">
                                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                                <fieldset className=' grid grid-cols-2 md:grid-cols-3'>
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
                                            checked={editedSlug?.includes('Planète')}
                                        />
                                        <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Planète">Planète</label>
                                    </div>

                                    <div>
                                        <input
                                            className=''
                                            type="checkbox"
                                            id="Systeme_Solaire"
                                            {...register('editedSlug', { required: true })}
                                            checked={editedSlug?.includes('Systeme Solaire')}
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
                                            checked={editedSlug?.includes('Objet Stélaire')}

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
                                            checked={editedSlug?.includes('Etoile')}

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
                                            checked={editedSlug?.includes('Météorite')}
                                            onChange={handleSlugChange}

                                        />
                                        <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Météorite">Météorite</label>
                                    </div>
                                    <div className=''>

                                        {errors.Slug && (
                                            <p className="dark:text-white font-bold text-red-600 ">Veuillez sélectionner au moins un Slug pour l'article en question</p>
                                        )}


                                    </div>
                                </fieldset>

                            </div>

                            {/* JSX For the textArea */}
                            {editedSections?.map((section, index) => (
                                <div key={index}>
                                    <div className="mb-6">
                                        <label htmlFor={`Section_titre_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre de la Section</label>
                                        <input
                                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                            name={`Section_titre_${index}`}
                                            id={`Section_titre_${index}`}
                                            value={section?.titre}
                                            {...register(`Section_titre${index}`, {
                                                required: "Veuillez taper un titre de section",
                                                pattern: {
                                                    required: true,

                                                    message: "Veuillez taper un Titre qui contien au moins 3 caractères et au maxmimum 40 caractères"
                                                }
                                            })}
                                            onChange={(e) => {
                                                const updatedSections = [...editedSections];
                                                updatedSections[index].titre = e.target.value;
                                                setEditedSections(updatedSections);
                                            }}
                                        />
                                        <>
                                            <p className='dark:text-white text-sm md:text-md ml-1 mt-2'>
                                                {countingChar(editedSections[index].titre)} / 40 </p>
                                        </>
                                        <>
                                            {errors[`Section_titre${index}`] && (
                                                <p className='dark:text-white text-red-600 font-bold text-sm md:text-md ml-1 mt-2'>{errors[`Section_titre${index}`]?.message}</p>
                                            )}
                                        </>
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor={`Section_${index}`}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Section
                                        </label>
                                        <textarea
                                            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                            cols="30"
                                            rows="10"
                                            name={`Section_${index}`}
                                            id={`Section_${index}`}
                                            value={section.contenu}
                                            {...register(`Section_${index}`, {
                                                required: "Veuillez taper une section d'article",
                                                pattern: {
                                                    message: "Veuillez écrire une section d'article avec au minimum 400 charactères et au maximum 1200 charactères"
                                                }
                                            })}
                                            onChange={(e) => {
                                                const text = e.target.value
                                                const updatedSections = [...editedSections];
                                                updatedSections[index].contenu = e.target.value;
                                                setEditedSections(updatedSections);

                                            }}
                                        ></textarea>
                                        <>
                                            <p className='dark:text-white text-sm md:text-md ml-1 mt-2'>
                                                {countingChar(editedSections[index].contenu)} / 1200 </p>
                                        </>
                                        <>
                                            {errors[`Section_${index}`] && (
                                                <p className='dark:text-white text-red-600 font-bold text-sm md:text-md ml-1 mt-2'>{errors[`Section_${index}`]?.message}</p>
                                            )}
                                        </>

                                        <div className='mt-5 ml-1'>

                                            <label className='dark:text-white mr-2 text-sm md:text-base'
                                                htmlFor={`Image_Section_${index}`}>Image liée à la séction</label>
                                            <input
                                                className='dark:text-white text-sm md:text-base'
                                                type="file"
                                                name={`Image_Section_${index}`}
                                                id={`Image_Section_${index}`}
                                                {...register(`Image_Section_${index}`,
                                                    {

                                                        validate: {
                                                            lessThan10MB: files => {
                                                                if (files[0]) {
                                                                    if (files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/jpg" && files[0].type !== "image/webp") {

                                                                        return "Nous n'acceptons que les images de type PNG, JPEG, JPG ou Webp"
                                                                    }
                                                                }
                                                            },
                                                        },
                                                    })}
                                                onChange={(e) => handleImageChange(e, index)}

                                            />

                                            <>
                                                {errors[`Image_Section_${index}`] && (
                                                    <p className='dark:text-white text-red-600 font-bold text-sm md:text-md  mt-2'>{errors[`Image_Section_${index}`]?.message}</p>
                                                )}
                                            </>
                                        </div>
                                    </div>
                                    <div className='my-3'>

                                        <a role='button' onClick={() => { deleteLastSection(index) }} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Supprimer la section</a>
                                    </div>
                                </div>
                            ))}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 mb-6'  >
                                <a role='button' onClick={() => { addSection() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                                    Ajouter une Section
                                </a>


                                <button onClick={() => { handleSubmit() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publier article</button>


                            </div>

                            {/* End of */}
                        </form>
                    </>
                )}
        </section >
    )
}
