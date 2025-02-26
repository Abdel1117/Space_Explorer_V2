import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useAuth } from '../../Context/userContext'
import Side_Barre_DashBoard from '../../componants/Side_Barre_DashBoard/Side_Barre_DashBoard'
import Accueil from '../../componants/AdminDashBoard/Accueil'
import Images from '../../componants/AdminDashBoard/Images'
import Articles from '../../componants/AdminDashBoard/Articles'
import Users from '../../componants/AdminDashBoard/Users'
import Sub from "../../componants/AdminDashBoard/Sub.jsx"
export default function Dashboard() {
    const { userAuth } = useAuth()

    const [blockSection, setBlockSection] = useState("Accueil")

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | BackOffice</title>
                <meta name="description" content="Back Office de Space Explorer afin de pouvoir gérer les différentes section du site" />
            </Helmet>
            <section className='flex flex-row relative py-6 min-h-screen'>

                <Side_Barre_DashBoard blockSection={blockSection} setBlockSection={setBlockSection} />

                <div className='w-full min-h-[700px] rounded-lg md:mx-2 bg-[#F5F5F5] dark:bg[#252525]'>
                    {blockSection != "" ?

                        (blockSection === "Accueil") ?
                            <Accueil blockSection={blockSection} setBlockSection={setBlockSection} /> :

                            (blockSection === "Articles") ?
                                <Articles /> :

                                (blockSection === "Images") ?
                                    <Images /> :

                                    (blockSection === "Users") ?
                                        <Users /> :
                                        (blockSection === "Sub") ?
                                            <Sub /> :
                                            <Accueil />
                        :
                        <Accueil />

                    }
                </div>
            </section>
        </>
    )
}
