import React from 'react';
import { Helmet } from 'react-helmet';

export const PolitiqueDeConfidentialite = () => {
    return (
        <section className='container mx-auto  py-10 min-h-[100vh] '>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Politique De Confidentialité</title>
                <meta name="description" content="Space Explorer page de politique de confidentialité" />
            </Helmet>

            <h1 className="text-xl md:text-2xl dark:text-white mb-6">Politique de confidentialité</h1>



            <div className='mb-8'>
                <strong className='dark:text-white'>Introduction</strong>



                <p className="text-sm md:text-md dark:text-white">
                    Devant le développement des nouveaux outils de communication, il est nécessaire de porter une attention particulière à la protection de la vie privée. C’est pourquoi, nous nous engageons à respecter la confidentialité des renseignements personnels que nous collectons.
                </p>
            </div>

            <h2 className="text-xl md:text-2xl dark:text-white mb-6">Collecte des renseignements personnels</h2>
            <div className='mb-8'>
                <ul className="text-sm md:text-md dark:text-white">
                    <li>Prénom</li>
                    <li>Adresse électronique</li>
                </ul>

                <p className="text-sm md:text-md dark:text-white">
                    Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et grâce à l’interactivité établie entre vous et notre site Web. Nous utilisons également, comme indiqué dans la section suivante, des fichiers témoins et/ou journaux pour réunir des informations vous concernant.
                </p>
            </div>

            <h2 className="text-xl md:text-2xl dark:text-white">Formulaires et interactivité:</h2>

            <div>
                <p className="text-sm md:text-md dark:text-white">
                    Vos renseignements personnels sont collectés par le biais de formulaire, à savoir :
                </p>
                <ul className="text-sm md:text-md dark:text-white">
                    <li>Formulaire d'inscription au site Web</li>
                </ul>
            </div>

            <div>
                <p className="text-sm md:text-md dark:text-white">
                    Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :
                </p>
                <ul className="text-sm md:text-md dark:text-white">
                    <li>Informations / Offres promotionnelles</li>
                </ul>
            </div>

            <div className='mb-8'>
                <p className="text-sm md:text-md dark:text-white">Vos renseignements sont également collectés par le biais de l’interactivité pouvant s’établir entre vous et notre site Web et ce, de la façon suivante: Formulaire</p>
            </div>


            <h2 className="text-xl md:text-2xl dark:text-white">Droit d’opposition et de retrait</h2>
            <div className='mb-8'>
                <p className="text-sm md:text-md dark:text-white">Nous nous engageons à vous offrir un droit d’opposition et de retrait quant à vos renseignements personnels.</p>
            </div>

            <h2 className="text-xl md:text-2xl dark:text-white">Droit d’accès</h2>
            <div className='mb-8'>
                <p className="text-sm md:text-md dark:text-white">Nous nous engageons à reconnaître un droit d’accès et de rectification aux personnes concernées désireuses de consulter, modifier, voire radier les informations les concernant.</p>
            </div>

            <h2 className="text-xl md:text-2xl dark:text-white">Sécurité</h2>
            <div className='mb-8'>
                <p className="text-sm md:text-md dark:text-white">
                    Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes travaillant pour nous sont tenues de respecter la confidentialité de vos informations.
                </p>
                <p className="text-sm md:text-md dark:text-white">
                    Pour assurer la sécurité de vos renseignements personnels, nous avons recours aux mesures suivantes :
                </p>
                <ul className="text-sm md:text-md dark:text-white">
                    <li>Protocole SSL</li>
                    <li>Gestion des accès - personne autorisée</li>
                    <li>Logiciel de surveillance du réseau</li>
                    <li>Sauvegarde informatique</li>
                    <li>Identifiant / mot de passe</li>
                    <li>Pare-feu</li>
                </ul>
                <p className="text-sm md:text-md dark:text-white">Nous nous engageons à maintenir un haut degré de confidentialité en intégrant les dernières innovations technologiques permettant d’assurer la confidentialité de vos transactions. Toutefois, comme aucun mécanisme n’offre une sécurité maximale, une part de risque est toujours présente lorsque l’on utilise Internet pour transmettre des renseignements personnels.</p>
            </div>

            <h2 className="text-xl md:text-2xl dark:text-white">Législation</h2>
            <div>
                <p className="text-sm md:text-md dark:text-white">Nous nous engageons à respecter les dispositions législatives énoncées dans : Règlement Général sur la Protection des Données (RGPD).</p>
            </div>
        </section>
    );
};
