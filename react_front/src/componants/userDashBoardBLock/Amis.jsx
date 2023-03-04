import React from 'react'

const User = [

    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },
    {
        nom: "John",
        prenom: "Doe",
        Age: "20",
        pseudo: "@Username "
    },


]

export default function Amis() {
    return (
        <div className='flex flex-wrap lg:flex-nowrap w-full shadow-lg dark:bg-[#252525]'>

            <div className='w-full lg:w-4/12 xl:w-5/12 m-0 md:m-4 shadow-lg rounded-lg'>
                <div className='w-full px-2 py-4 flex flex-col  mr-4 '>
                    <h2 className='dark:text-white mb-2'>Votre liste d'amis</h2>

                    {User.map((user, index) =>
                        <div key={index} className='w-full dark:bg[#252525]  p-2 shadow-md rounded-lg my-1'>
                            <div className='flex flex-wrap '>
                                <div>
                                    <img src="https://via.placeholder.com/50" alt="" className='rounded-full' />
                                </div>
                                <div className='flex flex-col flex-1 ml-2 my-auto'>
                                    <p className='text-xs dark:text-white my-1'>{user.nom}</p>
                                    <p className='text-xs dark:text-white'>{user.pseudo}</p>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className='w-full min-h-[800px] h-auto shadow-lg border rounded-lg mt-4  lg:m-4'>
                    <div>
                    </div>  
            </div>
        </div>
    )
}
