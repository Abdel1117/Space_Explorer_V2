import React, { useState, useEffect } from 'react'
import { TableUser } from '../Table/TableUser';
import Toast_invalide from '../Toast_invalide/Toast_invalide';
import Astronaute_in_front_of_computer from "../../assets/images/cute-astronaut-front-computer-no-bg.png";
import Toast_validation from '../Toast_valide/Toast_valide';
import { FormModal } from '../ActionModal/FormModal';
export default function Users() {

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(null)
  const [userSelected, setUserSelected] = useState([])
  const [dataChanged, setDataChanged] = useState(false)
  const [toggle, setToggle] = useState(false)
  /* State for Retrieve User */
  const [id, setId] = useState(null)


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

  /* CRUD Function for user */

  const banUser = async (id, name) => {

    const userConfirm = window.confirm(`Voullez vous vraiment Bannir du Site : ${name}`)

    if (userConfirm) {

      try {
        setLoading(true)
        const request = await fetch(`${apiUrl}/user/deleteUser/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", "authorization": `Bearer ${sessionStorage.getItem('token')}` },
          credentials: "include",
        })
        const response = await request.json();

        if (request.status === 200) {

          console.log(response)
          setDataChanged(true)

        } else {
          Toast_invalide("Une erreure lors de la suppression est survenu")
          console.log(response)
        }
      } catch (error) {


        console.log(error)
      } finally {
        setLoading(false)
      }

    }
  }

  const OpenModal = async (id) => {
    setId(id)
    setToggle(true)
  }
  /* End of the functions handling Selection  */
  useEffect(() => {
    const getAllUser = async () => {
      try {
        setLoading(true)

        const request = await fetch(`${apiUrl}/user/getAllUsers`)
        if (request.ok) {
          const response = await request.json();
          setUsers(response)
          setDataChanged(false)

        } else {
          setUsers([])
          Toast_invalide("une erreur est survenu")
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
  }, [dataChanged])

  return (
    <section className='w-full h-full shadow-lg  bg-white dark:bg-[#252525] p-2 md:p-5'>
      {users === null ?
        <p>Loading...</p> :
        <>

          <div className='bg-light-blue dark:bg-dark-blue rounded-md my-5 relative h-[400px] sm:h-60'>
            <h2 className='text-white p-6 font-semibold z-10 '>
              Utilisateurs de Space Explorer
            </h2>


            <img className='w-64 h-auto object-cover bg-transparent absolute sm:top-0 sm:right-0 ' src={Astronaute_in_front_of_computer} alt="Astronaute Devant un ordinateur" />
          </div>
          <TableUser
            users={users}
            userSelected={userSelected}
            handleUserSelection={handleUsersSelection}
            selectAllUsers={selectAllUser}
            deselectAllUsers={deselectAllUsers}
            handleSelectAllChange={handleSelectAllChange}
            handleSearch={handleSearch}
            loading={loading}
            banUser={banUser}
            OpenModal={OpenModal}
          />
        </>
      }
      {toggle &&
        <FormModal id={id} setToggle={setToggle} setDataChanged={setDataChanged} dataChanged={dataChanged} />}


    </section >
  )
}
