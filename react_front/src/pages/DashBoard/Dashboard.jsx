import React, { useEffect } from 'react'
import { useAuth } from '../../Context/userContext' 
export default function Dashboard() {
    const {userAuth} = useAuth()

    useEffect(()=>{
        console.log(userAuth)
    },[])

    return (
        <section>
            <h1 className='text-white'>Bienvenu Admin {userAuth.userId}</h1>

        </section>
    )
}
