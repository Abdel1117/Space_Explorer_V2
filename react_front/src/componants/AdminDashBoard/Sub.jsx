import React, { useState, useEffect } from 'react'
import { TableSub } from '../Table/TableSub'
import Toast_invalide from '../Toast_invalide/Toast_invalide'
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";

export default function Sub() {

    const [loading, setLoading] = useState(false)
    const [sub, setSub] = useState([])
    const [subSelected, setSubSelected] = useState([])
    const [toggle, setToggle] = useState(false)
    const [error, setError] = useState("")
    const [dataChanged, setDataChanged] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL


    useEffect(() => {
        const loadSub = async () => {
            try {
                setLoading(true)
                const request = await fetch(`${apiUrl}/user/getAllSubs`)
                if (request.ok) {
                    const response = await request.json();
                    setSub(response)
                    setDataChanged(false)

                } else {
                    setSub([])
                    setError("une erreur est survenu")
                }
            } catch (error) {
                console.log(error)

            } finally {
                setLoading(false)
            }
        }

        loadSub()
    }, [dataChanged])


    const deleteSub = async (email) => {

        const userConfirm = window.confirm(`Voullez vous vraiment supprimer l'abonné avec l'email suivant  ${email}`)

        if (userConfirm) {
            try {
                setLoading(true)
                const response = await fetch(`${apiUrl}/user/deleteSub`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    setError("Une erreur lors de la supression est survenu")
                } else {

                    const data = await response.json();
                    setDataChanged(true)
                }

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while trying to unsubscribe.');
            }
            finally {
                setLoading(false)
            }

        }
    }

    const handleSubSearch = async () => {

    }

    return (
        <section className='w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>
            {sub === null ?
                <p>Loading...</p> :
                <>

                    <div className='bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-[400px] sm:h-60'>
                        <h2 className='text-white p-6 font-semibold z-10 '>
                            Utilisateurs de Space Explorer
                        </h2>


                        <img className='w-64 h-auto object-cover bg-transparent absolute sm:top-0 sm:right-0 ' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
                    </div>
                    <TableSub
                        sub={sub}
                        subSelected={subSelected}
                        loading={loading}
                        deleteSub={deleteSub}

                    />
                </>
            }
            {toggle &&
                <FormModal id={id} setToggle={setToggle} setDataChanged={setDataChanged} dataChanged={dataChanged} />}


        </section >
    )
}
