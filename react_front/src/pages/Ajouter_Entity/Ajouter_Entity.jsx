import React, { useState } from 'react'
import AjoutArticle from '../../componants/AjoutArticle/AjoutArticle';

export default function Ajouter_Entity() {
  const [Action, SetAction] = useState("");
  let ComponantToRender
  switch (Action) {
    case "Article":
      ComponantToRender = <AjoutArticle />
      break;
    case "Image":
      ComponantToRender = <AjouterImage />
    case "Video":
      ComponantToRender = <AjouterVideo />
    default:
      break;
  }

  return (
    <section className='py-10'>
      <AjoutArticle />


    </section>
  )
}
