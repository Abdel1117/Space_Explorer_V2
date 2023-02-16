import React, { useContext, useEffect, useState } from 'react'
import { checkToken } from '../../Hooks/checkToken'
import { useParams } from 'react-router-dom'
import userContext from '../../Context/userContext';

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
                    .then(data => setData(data))
                    .then(setIsLoading(false));
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }

        fetchData()

    }, [])
    return (
        <section className='mx-auto container border shadow-md rounded-lg'>

            {isLoading === true ?

                <div>Loading ...</div>

                :

                <div>
                    {data.email}
                </div>
            }


        </section>
    )
}
