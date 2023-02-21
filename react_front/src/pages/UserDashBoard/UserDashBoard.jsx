import React, { useContext, useEffect, useState } from 'react'
import { checkToken } from '../../Hooks/checkToken'
import { useParams } from 'react-router-dom'
import userContext from '../../Context/userContext';
import Aside from '../../componants/aside/Aside';
import { FcHome, FcBusinessman, FcBusinesswoman, FcConferenceCall, FcFeedback, FcSettings } from "react-icons/fc"
export const UserDashBoard = () => {
    const userId = useParams();
    const [isAuth, setIsAuth] = useState(false);

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

                <div className='mx-auto w-[200px] h-[200px] p-1 shadow-md mt-5 flex flex-col text-center justify-center '>Loading ...</div>

                :
                <section className='p-2 md:p-0 flex flex-col  lg:flex-row lg:justify-around'>

                    <Aside data={data} />

                    <div className='w-full md:w-4/6 lg:w-8/12 border shadow-lg h-[700px] mt-5 rounded-lg'>

                    </div>

                </section>
            }

        </>


    )
}
