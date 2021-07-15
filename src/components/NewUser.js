import { useState } from "react";

function NewUser({handleNewUser, setUserForm}) {

  const [newName, setNewName] = useState('')

  function handleChange(e) {
    setNewName(e.target.value)
  }
  
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        setUserForm(false)
        let name = newName
        setNewName('')
        handleNewUser(name)
      }}>
        <input type="text" value={newName} onChange={handleChange} />
        <input type="submit" value="Add User" />
      </form>
    </>
  )
}

export default NewUser;