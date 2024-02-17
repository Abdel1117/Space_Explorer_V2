import React from 'react'
import { Helmet } from 'react-helmet'

export const MentionLegales = () => {
    return (
        <section className='min-h-[100vh]'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Mentions Légales </title>
                <meta name="description" content="Space Explorer page de Mentions Légales" />
            </Helmet>
            <h1 className='dark:text-white'>Mentions Légales</h1>

        </section>
    )
}
