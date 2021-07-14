import { useState } from "react";
import MovieCard from './MovieCard'

function NewGroup({userList, currentName, currentUser, apiKey}) {

  // controlled inputs states
  const [groupName, setGroupName] = useState('')
  const [groupMembers, setGroupMembers] = useState([currentUser])
  const [movieName, setMovieName] = useState('')
  const [movieList, setMovieList] = useState([])

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
    setMovieName('')
    let searchString = movieSearch.replace(" ","%20")
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchString}&page=1&r=json`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
      }
      })
      .then(resp => resp.json())
      .then((data) => {
        let imdbID = data.Search[0].imdbID
        fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${imdbID}&r=json`, {
	        "method": "GET",
	        "headers": {
		          "x-rapidapi-key": apiKey,
		          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
	        }
        })
        .then(resp => resp.json())
        .then((data) => {
          let newMovie = {
            title: data.Title,
            genre: data.Genre,
            rating: data.imdbRating,
            release_date: data.Year,
            image: data.Poster
          }
          console.log(newMovie)
          let newList = [...movieList, newMovie]
          setMovieList(newList)
        })
      })
      
  }

  function createNewGroup() {
    console.log(groupName)
    console.log(groupMembers)
    console.log(movieList)
    let groupContents = {
      name: groupName,
      members: groupMembers,
      movies: movieList
    }

    fetch('http://localhost:9393/new-group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(groupContents)
    })
    .then(resp => resp.json())
    .then(console.log)
  }

  return (
    <>
      <br />
      <button onClick={createNewGroup}>Create Group</button>
      <label>Enter your new group name:</label>
      <input type="text" onChange={handleGroupName} value={groupName}></input>
      <br />
      <label>Add your group members:</label>
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
        <input type="submit" value="Add Movie"></input>
      </form>
      {movieList.map(movie => <MovieCard key={movie.title} movie={movie}/>)}
    </>
  )
}

export default NewGroup;