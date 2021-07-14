import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import GroupPage from './GroupPage'
import NavBar from './NavBar'
import NewGroup from './NewGroup'

function App() {

  const apiKey = ""

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
        <Route exact path="/group-page">
          <GroupPage currentName={currentName} currentUser={currentUser}/>
        </Route>
        <Route exact path="/new-group">
          <NewGroup userList={userList} currentName={currentName} currentUser={currentUser} apiKey={apiKey}/>
        </Route>
      </Switch>
    </>
  )
}

export default App;