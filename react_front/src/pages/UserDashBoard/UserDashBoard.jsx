import React, { useEffect, useState } from 'react'
import { checkToken } from '../../Hooks/checkToken'
import { useFetch } from '../../Hooks/useFetch';


export const UserDashBoard = () => {

    

    const [isAuth, setIsAuth] = useState(false);
    const { data, isLoading, error } = useFetch("http://localhost:4000/userProfil/", "GET")

    const { userData } = data

    return (
        <section className='mx-auto container border shadow-md rounded-lg'>
            <h1>UserDashBoard</h1>



        </section>
    )
}
