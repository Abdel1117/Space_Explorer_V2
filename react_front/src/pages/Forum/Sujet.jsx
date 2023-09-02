import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../../componants/Spinner/Spinner';
export const Sujet = () => {
    const sujetId = useParams()
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)
    const [sujet, setSujet] = useState(null)

    const getSujetAndResponse = async () => {
        try {
            setLoading(true)
            const request = await fetch(`${apiUrl}/forum/${sujetId.id}`, {
                method: "GET"
            });

            const response = await request.json();
            setSujet(response);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getSujetAndResponse();
    }, []);
    return (
        <>
            {
                loading === true ? <Spinner /> :
                    <section className='min-h-screen'>
                        <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'>{sujet?.Title}</h1>
                    </section>



            }


        </>
    )
}
