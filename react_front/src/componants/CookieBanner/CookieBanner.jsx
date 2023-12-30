import React from 'react'

export const CookieBanner = () => {


    const acceptCookie = (value) => {
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
        let expires = "expires=" + date.toUTCString();
        const cookie = document.cookie = "acceptCookie" + "=" +  value + ";" + expires + ";path=/";
    }
    return (
        <div className='bg-white border rounded-md shadow-xl min-w-[fit-content] mx-auto p-3 md:p-5 animate-fadeIn fixed bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%] flex flex-col  items-center justify-center z-50 '>

            <div className="text-2xl flex flex-col pb-4">

                <span className="text-3xl font-bold">Les Cookies... </span>
            </div>
            <div className="pb-2 md:pb-4">
                <p>Acceptez-vous de nous laisser utiliser des cookies ?
                </p>
            </div>
            <div className='pb-2 md:pb-4'>
                <small>
                    Certains cookies sont nécessaires à des fins techniques, ils sont donc dispensés de consentement. D'autres, non obligatoires, peuvent être utilisés pour la personnalisation des annonces et du contenu, la mesure des annonces et du contenu, la connaissance de l'audience et le développement de produits, les données de géolocalisation précises et l'identification par le balayage de l'appareil, le stockage et/ou l'accès aux informations sur un appareil. Si vous donnez votre consentement, celui-ci sera valable sur l’ensemble des sous-domaines de Space-Explorer. Vous disposez de la possibilité de retirer votre consentement à tout moment en cliquant sur consent choices en bas à droite de la page. Pour en savoir plus, visitez notre privacy center.
                </small>
            </div>
            <div className='flex justify-between items-center w-full min-w-[280px] py-4 md:mt-5'>
                <button onClick={() => { acceptCookie(true) }} className='min-w-[100px] outline-none p-1 rounded-md text-white bg-blue-500 hover:bg-blue-600'>
                    Accepter
                </button>
                <button onClick={() => { acceptCookie(false) }} className='min-w-[100px] outline-none p-1 rounded-md text-white bg-red-600 hover:bg-red-700'>
                    Refuser
                </button>
            </div>


        </div>
    )
}
