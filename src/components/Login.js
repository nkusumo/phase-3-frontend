import { useState } from "react";
import NewUser from "./NewUser";

function Login({userList, handleLogin, handleNewUser}) {

  const [userForm, setUserForm] = useState(false)
  
  return (
    <>
      <br/>
      <label>Who are you?</label>
      <select onChange={handleLogin} defaultValue="default">
        <option value="default" disabled>Select here</option>
        {userList.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
      </select>
      <button onClick={() => setUserForm(!userForm)}>{!userForm ? "Add a new user" : "Hide new user form"}</button>
      {userForm ? <NewUser handleNewUser={handleNewUser} /> : null}
    </>
  )
}

export default Login;