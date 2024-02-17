import React, { useState } from 'react'
import AjoutArticle from '../../componants/AjoutArticle/AjoutArticle';
import { Helmet } from 'react-helmet';
export default function Ajouter_Article() {

  return (

    <section className='py-10'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Space Explorer | Edition D'article </title>
        <meta name="description" content="Page afin d'écrire des articles sur Space Explorer" />
      </Helmet>
      <AjoutArticle />
    </section>
  )
}
