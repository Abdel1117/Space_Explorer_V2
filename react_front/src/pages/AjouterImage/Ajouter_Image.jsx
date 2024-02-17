import React from 'react'
import AjoutImage from '../../componants/AjoutImage/AjoutImage'
import { Helmet } from 'react-helmet'

export default function Ajouter_Image() {
    return (

        <section className="flex flex-col items-center min-h-screen pt-8">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Ajouter Image</title>
                <meta name="description" content="Ajouter des images sur Space Explorer." />
            </Helmet>
            <AjoutImage />
        </section >
    )
}
