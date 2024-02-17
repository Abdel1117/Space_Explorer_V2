import React from 'react'
import { Helmet } from 'react-helmet'

export const PolitiqueDeConfidentialite = () => {
    return (
        <section className='min-h-[100vh]'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Politique De Confidentialité </title>
                <meta name="description" content="Space Explorer page de politique de confidentialité" />
            </Helmet>
            <h1 className='dark:text-white'>Politique De Confidentialité</h1>
        </section>
    )
}
