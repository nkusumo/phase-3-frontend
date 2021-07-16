import { useState } from "react";
import NewUser from "./NewUser";

import Select from 'react-select'

function Login({userList, handleLogin, handleNewUser}) {

  const [userForm, setUserForm] = useState(false)

  const options = userList.map(user => ({value: user.id, label: user.name}))
  
  return (
    <div className="loginPage">
      <h3>Who are you?</h3>
      {/* <select className="userSelect" onChange={handleLogin} defaultValue="default">
        <option value="default" disabled>Select here</option>
        {userList.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
      </select> */}

      <Select options={options} onChange={handleLogin}/>

      <button onClick={() => setUserForm(!userForm)}>{!userForm ? "Add a new user" : "Hide new user form"}</button>
      {userForm ? <NewUser handleNewUser={handleNewUser} setUserForm={setUserForm}/> : null}
    </div>
  )
}

export default Login;