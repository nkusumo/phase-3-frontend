import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import GroupPage from './GroupPage'
import NavBar from './NavBar'

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [currentName, setCurrentName] = useState('')
  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:9393/users')
    .then(resp => resp.json())
    .then(setUserList)
  }, [])

  let history = useHistory()

  function handleLogin(e) {
    setCurrentUser(e.target.value)
    let user = userList.find(user => user.id === parseInt(e.target.value))
    setCurrentName(user.name)
    history.push('/group-page')
  }

  return (
    <>
    <NavBar />
      <Switch>
        <Route exact path="/">
          <Home currentName={currentName}/>
        </Route>
        <Route exact path="/login">
          <Login userList={userList} handleLogin={handleLogin}/>
        </Route> 
        <Route>
          <GroupPage currentName={currentName} currentUser={currentUser}/>
        </Route>
      </Switch>
    </>
  )
}

export default App;