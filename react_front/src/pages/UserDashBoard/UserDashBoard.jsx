import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Aside from '../../componants/aside/Aside';
import Accueil from '../../componants/userDashBoardBLock/Accueil';
import Profil from "../../componants/userDashBoardBLock/Profil"
import Amis from "../../componants/userDashBoardBLock/Amis"
import Parametre from "../../componants/userDashBoardBLock/Parametre"
import Messages from "../../componants/userDashBoardBLock/Messages"



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


    return (
        <>
            {isLoading === true ?

                <div className='mx-auto w-[200px] h-[200px] p-1 shadow-md mt-5 flex flex-col text-center justify-center border '>Loading ...</div>

                :
                <section className='px-2 md:px-0 py-[50px] flex flex-col md:flex-row bg-[#F5F5F5] dark:bg-[#252525]'>

                    <Aside data={data} blockSection={blockSection} setBlockSection={setBlockSection} />

                    <div className='w-full border min-h-[700px] rounded-lg md:mx-2 bg-[#F5F5F5] dark:bg[#252525]'>
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
