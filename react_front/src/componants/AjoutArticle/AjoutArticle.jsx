import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";

export default function AjoutArticle() {
  const [article, setArticle] = useState({});
  const [Titre, setTitre] = useState("");
  const [Slug, setSlug] = useState([]);
  const [sections, setSections] = useState([

  ]);
  const [image, setImages] = useState("");
  const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
    criteriaMode: 'all',

  });
  /* Handling Section  */
  const addSection = () => {
    const nouvelleSection = {
      titre: "",
      contenu: "",
      image: ""
    };

    const updatedSections = [...sections, nouvelleSection];
    setSections(updatedSections);

    setValue(`Section_titre${updatedSections.length - 1}`, "");
    setValue(`Section_${updatedSections.length - 1}`, "");
  }
  const deleteLastSection = (index) => {

    const newState = [...sections]

    newState.splice(index, 1)
    setSections(newState)
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


  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageDataURL = event.target.result;

        setSections((prevSections) => {
          const updatedSections = [...prevSections];
          updatedSections[index] = {
            ...updatedSections[index],
            image: imageDataURL
          };
          return updatedSections;
        });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleForm = () => {
    const nouvelArticle = {
      titre: Titre,
      contenu: sections,
      slugs: Slug,
      image: image
    }

    setArticle((prevArticle) => ({ ...prevArticle, nouvelArticle }))
  }


  return (
    <section className={` `}>

      <form onSubmit={handleSubmit(handleForm)} className="w-[280px] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg p-4 mx-auto">
        <div className="mb-6">
          <label htmlFor="Titre_Article" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
          <input
            {...register('Article_title', {
              required: "Veuillez remplir ce champs avec un Titre",
              pattern: {
                value: /^(?! )[a-zA-Z0-9\-() ]{1,18}(?<! )$/,
                message: "Veuillez taper un titre qui contient 3 à 20 caractères "

              }
            })}
            onChange={(e) => { setTitre(e.target.value) }}
            type="text"
            name="Article_title"
            id="Titre_Article"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Titre de l'article"
            required />
        </div>
        <div className="mb-6">
          <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
          <fieldset className=' grid grid-cols-2 md:grid-cols-3'>
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
                id="Objet_Stélaire"
                {...register('Slug', { required: true })}
                name="Objet Stélaire"
                value="Objet Stélaire"
                onChange={handleSlugChange}
                checked={Slug.includes('Objet_Stélaire')}

              />
              <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Objet_Stélaire">Objet Stélaire</label>
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
                <p className="text-red-600">Veuillez sélectionner au moins un Slug pour l'article en question</p>
              )}


            </div>
          </fieldset>

        </div>
        {sections?.map((section, index) => (
          <div key={index}>
            <div className="mb-6">
              <label htmlFor={`Section_titre_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre de la Section</label>
              <input
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                name={`Section_titre_${index}`}
                id={`Section_titre_${index}`}
                value={section.titre}
                {...register(`Section_titre${index}`, {
                  required: "Veuillez taper un titre de section",
                  pattern: {
                    required: true,
                    value: /^(?! )[a-zA-Z0-9\-() ]{1,38}(?<! )$/,
                    message: "Veuillez taper un Titrre qui contien au moins 3 caractères et au maxmimum 20 caractères"
                  }
                })}
                onChange={(e) => {
                  const updatedSections = [...sections];
                  updatedSections[index].titre = e.target.value;
                  setSections(updatedSections);
                }}
              />
              <>
                {errors[`Section_titre${index}`] && (
                  <p>{errors[`Section_titre${index}`]?.message}</p>
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
                    required: true,
                    value: /^.{200,800}$/,
                    message: "Veuillez taper une section d'article qui contiens au moins 200 caractères et au maxmimum 800 caractères"
                  }
                })}
                onChange={(e) => {
                  const updatedSections = [...sections];
                  updatedSections[index].contenu = e.target.value;
                  setSections(updatedSections);
                }}
              ></textarea>
              <>
                {errors[`Section_${index}`] && (
                  <p className='dark:text-white text-sm md:text-md ml-1 mt-2'>{errors[`Section_${index}`]?.message}</p>
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
                      required: true,

                      message: "Veuillez insérer une image qui puisse accompagné le paragraphe "
                    })}
                  onChange={(e) => handleImageChange(e, index)}

                />
              </div>
            </div>
            <div className='my-3'>

              <a role='button' onClick={() => { deleteLastSection(index) }} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Supprimer la section</a>
            </div>
          </div>
        ))}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3' >
          <a role='button' onClick={() => { addSection() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
            Ajouter une Section
          </a>


          <button onClick={() => { handleSubmit() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publier article</button>


        </div>


      </form>

    </section >
  )
}
