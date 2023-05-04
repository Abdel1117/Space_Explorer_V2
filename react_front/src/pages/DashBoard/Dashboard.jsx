import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/userContext'
import Side_Barre_DashBoard from '../../componants/Side_Barre_DashBoard/Side_Barre_DashBoard'
import Accueil from '../../componants/AdminDashBoard/Accueil'
import Images from '../../componants/AdminDashBoard/Images'
import Articles from '../../componants/AdminDashBoard/Articles'
import Users from '../../componants/AdminDashBoard/Users'
export default function Dashboard() {
    const { userAuth } = useAuth()

    const [blockSection, setBlockSection] = useState("Accueil")

    return (
        <>
            <section className='flex flex-col md:flex-row relative py-6'>
                <Side_Barre_DashBoard blockSection={blockSection} setBlockSection={setBlockSection} />

                <div className='w-full min-h-[700px] rounded-lg md:mx-2 bg-[#F5F5F5] dark:bg[#252525]'>
                    {blockSection != "" ?

                        (blockSection === "Accueil") ?
                            <Accueil blockSection={blockSection} setBlockSection={setBlockSection} /> :

                            (blockSection === "Articles") ?
                                <Articles  /> :

                                (blockSection === "Images") ?
                                    <Images /> :

                                    (blockSection === "Users") ?
                                        <Users /> :
        
                                        <Accueil />
                        : 
                        <Accueil />

                    }
                </div>
            </section>
        </>
    )
}
