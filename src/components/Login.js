import { useState } from "react";
import NewUser from "./NewUser";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Login({userList, handleLogin, handleNewUser}) {

  const [userForm, setUserForm] = useState(false)
  
  return (
    <div className="loginPage">
      <h3>Who are you?</h3>

      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Select User</InputLabel>
        <Select onChange={handleLogin} label="Select User">
          {userList.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)}
        </Select>
      </FormControl>

      <button onClick={() => setUserForm(!userForm)}>{!userForm ? "Add a new user" : "Hide new user form"}</button>
      {userForm ? <NewUser handleNewUser={handleNewUser} setUserForm={setUserForm}/> : null}
    </div>
  )
}

export default Login;