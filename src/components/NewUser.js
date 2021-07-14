import { useState } from "react";

function NewUser({handleNewUser}) {

  const [newName, setNewName] = useState('')

  function handleChange(e) {
    setNewName(e.target.value)
  }
  
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleNewUser(newName)
      }}>
        <input type="text" value={newName} onChange={handleChange} />
        <input type="submit" value="Add User" />
      </form>
    </>
  )
}

export default NewUser;