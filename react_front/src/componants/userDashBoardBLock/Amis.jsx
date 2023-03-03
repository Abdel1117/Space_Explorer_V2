import React from 'react'

const User = [

    {
            nom: "John",
            prenom : "Doe",
            Age : "20",
            pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    {
        nom: "John",
        prenom : "Doe",
        Age : "20",
        pseudo : "@Username "
    },
    

]

export default function Amis() {
    return (
        <div className='flex justify-between w-full md:w-3/12 '>
            <div className='w-full '>
                
            <h2 className='dark:text-white'>Votre liste d'amis</h2>

                <div className='w-full px-2 py-4 flex flex-col'>
                    {User.map((user, index) => 
                        <div key={index} className='w-full dark:bg[#252525] border p-2 shadow-md rounded-lg my-1'>
                            <div className='flex flex-wrap '>
                                <div>
                                    <img src="https://via.placeholder.com/50" alt="" className='rounded-full' />
                                </div>
                                <div className='flex flex-col flex-1 ml-2 my-auto'>
                                    <p className='text-xs my-1'>{user.nom}</p>
                                    <p className='text-xs'>{user.pseudo}</p>
                                
                                </div>
                            </div>
                        </div>    
                    )}
                    </div>
            </div>
        </div>
    )
}
