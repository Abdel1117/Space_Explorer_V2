import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import { TableUser } from '../Table/TableUser';

export default function Users() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(null)
  const [userSelected, setUserSelected] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  /* Fonctions to handle the selections */

  const handleSearch = (e) => {
    // Filtrer les articles en fonction de la correspondance de la recherche
    const result = e.target.value
    findArticle(result)
  }



  const handleUsersSelection = (index) => {
    setUserSelected(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    })
  }

  const selectAllUser = () => {
    const allIndices = users.map((_, index) => index);

    setUserSelected(allIndices);
  }

  const deselectAllUsers = () => {
    setUserSelected([]);
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllUser();
    }
    else {
      deselectAllUsers();
    }
  }



  /* End of the functions handling Selection  */




  useEffect(() => {
    const getAllUser = async () => {
      try {
        setLoading(true)

        const request = await fetch(`${apiUrl}/getAllUsers`)
        if (request.ok) {
          const response = await request.json();
          setUsers(response)
        } else {
          setUsers([])
          console.log("Une erreur est survenu")
        }
      } catch (error) {
        setUsers([])
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    getAllUser()
  }, [])

  return (
    <section className='w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>
      {users === null ?
        <p>Loading...</p> :
        <>
          <TableUser
            users={users}
            userSelected={userSelected}
            handleUserSelection={handleUsersSelection}
            selectAllUsers={selectAllUser}
            deselectAllUsers={deselectAllUsers}
            handleSelectAllChange={handleSelectAllChange}
            handleSearch={handleSearch}
          />
        </>
      }



    </section >
  )
}
