import React, { useContext, useEffect, useState } from 'react'
import { checkToken } from '../../Hooks/checkToken'
import { useParams } from 'react-router-dom'
import userContext from '../../Context/userContext';
import Aside from '../../componants/aside/Aside';
import Accueil from '../../componants/userDashBoardBLock/Accueil';
import Profil from "../../componants/userDashBoardBLock/Profil"
import Amis from "../../componants/userDashBoardBLock/Amis"
import Parametre from "../../componants/userDashBoardBLock/Parametre"
import Messages from "../../componants/userDashBoardBLock/Messages"


import { FcHome, FcBusinessman, FcBusinesswoman, FcConferenceCall, FcFeedback, FcSettings } from "react-icons/fc"


export const UserDashBoard = () => {
    const userId = useParams();
    const [blockSection, setBlockSection] = useState("");
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({})

    useEffect(() => {

        setIsLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/userProfil/${userId.id}`, {
                    method: "GET"
                })

                    .then(data => data.json())
                    .then(data => { setData(data) })
                    .then(setIsLoading(false));
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }

        fetchData()

    }, [])

    useEffect(() => {
        console.log(blockSection)
    }, [blockSection])
    return (
        <>
            {isLoading === true ?

                <div className='mx-auto w-[200px] h-[200px] p-1 shadow-md mt-5 flex flex-col text-center justify-center border '>Loading ...</div>

                :
                <section className='px-2 md:px-0 py-[50px] flex flex-col lg:flex-row lg:justify-around '>

                    <Aside data={data} blockSection={blockSection} setBlockSection={setBlockSection} />

                    <div className='w-full md:w-4/6 lg:w-8/12 border shadow-lg min-h-[700px] rounded-lg '>
                        {blockSection != "" ?

                            (blockSection === "Accueil") ?
                                <Accueil /> :

                                (blockSection === "Profil") ?
                                    <Profil /> :

                                    (blockSection === "Amis") ?
                                        <Amis /> :

                                        (blockSection === "Parametre") ?
                                            <Parametre /> :

                                            (blockSection === "Messages") ?
                                                <Messages />

                                                :
                                                <Accueil />
                            : <Accueil />

                        }
                    </div>

                </section>
            }

        </>


    )
}
