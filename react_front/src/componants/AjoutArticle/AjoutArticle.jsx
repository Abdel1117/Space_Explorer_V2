import React, { useState } from 'react'

export default function AjoutArticle() {
  const [article, setArticle] = useState({});
  const [Titre, setTitre] = useState("");
  const [Slug, setSlug] = useState("");
  const [sections, setSections] = useState([

  ]);

  const ajouterSection = () => {
    const nouvelleSection = {
      titre: "",
      contenu: ""
    };
    setSections([...sections, nouvelleSection])
  }

  const handleSlugChange = (e) => {
    const slug = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      setSlug((prevSlug) => [...prevSlug, slug]);
    } else {
      setSlug((prevSlug) => prevSlug.filter((prevSlug) => prevSlug !== slug))
    }
  }

  const handleSubmit = () => {
    const nouvelArticle = {
      titre: Titre,
      contenu: sections,
      slugs: Slug,

    }

    console.log(nouvelArticle)
  }


  return (
    <section className={` `}>

      <form onSubmit={() => { handleSubmit() }} className="w-[280px] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg p-4 mx-auto">
        <div class="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
          <input onChange={(e) => { setTitre(e.target.value) }} type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Titre de l'article" required />
        </div>
        <div class="mb-6">
          <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
          <fieldset className=' grid grid-cols-2 md:grid-cols-3'>
            <legend className="text-sm md:text-md dark:text-white">Choisisez au moins une catégorie </legend>

            <div>
              <input
                className=''
                type="checkbox"
                id="Planète"
                name="Planète"
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
                name="Systeme_Solaire"
                value="Systeme Solaire"
                onChange={handleSlugChange}
                checked={Slug.includes('Systeme_Solaire')}
              />
              <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Systeme_Solaire">Système Solaire</label>
            </div>

            <div>
              <input
                className=''
                type="checkbox"
                id="Objet_Stélaire"
                name="Objet_Stélaire"
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
                name="Météorite"
                value="Météorite"
                onChange={handleSlugChange}
                checked={Slug.includes('Météorite')}
              />
              <label className='text-sm md:text-md dark:text-white ml-1' htmlFor="Météorite">Météorite</label>
            </div>
          </fieldset>

        </div>
        {sections.map((section, index) => (
          <div key={index}>
            <div class="mb-6">
              <label htmlFor={`Section_titre_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre de la Section</label>
              <input
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                name={`Section_titre_${index}`}
                id={`Section_titre_${index}`}
                value={section.titre}
                onChange={(e) => {
                  const updatedSections = [...sections];
                  updatedSections[index].titre = e.target.value;
                  setSections(updatedSections);
                }}
              />
            </div>
            <div class="mb-6">
              <label htmlFor={`Section_${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
              <textarea
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                name={`Section_${index}`}
                id={`Section_${index}`}
                value={section.contenu}
                onChange={(e) => {
                  const updatedSections = [...sections];
                  updatedSections[index].contenu = e.target.value;
                  setSections(updatedSections);
                }}
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        ))}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3' >
          <a href="#" onClick={() => { ajouterSection() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
            Ajouter une Section
          </a>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publier article</button>


        </div>
      </form>

    </section>
  )
}
