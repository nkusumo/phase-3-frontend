import { useState } from "react";

function NewGroup({userList, currentName, currentUser, apiKey}) {

  // controlled inputs states
  const [groupName, setGroupName] = useState('')
  const [groupMembers, setGroupMembers] = useState([currentUser])
  const [movieName, setMovieName] = useState('')

  function handleGroupName(e) {
    setGroupName(e.target.value)
  }

  function addMember(e) {
    let newMembers = [...groupMembers, e.target.value]
    setGroupMembers(newMembers);
  }

  function getUserNames(id) {
    let groupUser = userList.find(user => user.id == id)
    return groupUser.name
  }
  
  function handleMovie(e) {
    setMovieName(e.target.value)
  }
 

  function addMovie(e) {
    e.preventDefault()
    let movieSearch = movieName
    let searchString = movieSearch.replace(" ","%20")
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchString}&page=1&r=json`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
      }
      })
      .then(resp => resp.json())
      .then(console.log)
    }

  return (
    <>
      <label>Enter your new group name:</label>
      <input type="text" onChange={handleGroupName} value={groupName}></input>
      <select onChange={addMember} defaultValue="default">
        <option value="default" disabled>Select here</option>
        {userList.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
      </select>
      <h3>Group Members</h3>
      <ul>
        {groupMembers.map(id => <li key={id}>{getUserNames(id)}</li>)}
      </ul>
      <h3>Add your movie candidates</h3>
      <form onSubmit={addMovie}>
        <input type="text" onChange={handleMovie} value={movieName}></input>
      </form>
    </>
  )
}

export default NewGroup;