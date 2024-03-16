import React from 'react'
import FormUser from '../form_User/FormUser'
const Profil = ({ user, dataChanged, setDataChanged }) => {
  return (
    <div>
      <FormUser
        user={user}
        dataChanged={dataChanged}
        setDataChanged={setDataChanged} />

    </div>
  )
}

export default Profil