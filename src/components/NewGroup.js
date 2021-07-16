import { useState } from "react";
import { useHistory } from "react-router";
import MovieCard from './MovieCard'
import MovieChoices from './MovieChoices'

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function NewGroup({userList, currentName, currentUser, apiKey}) {

  // controlled inputs states
  const [groupName, setGroupName] = useState('')
  const [groupMembers, setGroupMembers] = useState([currentUser])
  const [movieName, setMovieName] = useState('')
  const [movieList, setMovieList] = useState([])
  const [movieChoiceDisplay, setMovieChoiceDisplay] = useState(false)
  const [movieChoiceList, setMovieChoiceList] = useState([])


  let history = useHistory()

  function handleGroupName(e) {
    setGroupName(e.target.value)
  }

  function addMember(e) {
    if(groupMembers.includes(e.target.value)) {
      window.alert("This person is already in the group!")
    } else {
      let newMembers = [...groupMembers, e.target.value]
      setGroupMembers(newMembers);
    }
  }

  function removeMember(removeId) {
    let newMembers = groupMembers.filter(id => id !== removeId)
    setGroupMembers(newMembers)
  }

  function getUserNames(id) {
    let groupUser = userList.find(user => user.id == id)
    return groupUser.name
  }
  
  function handleMovie(e) {
    setMovieName(e.target.value)
  }
 

  function searchMovies(e) {
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
        setMovieChoiceList(data.Search)
        setMovieChoiceDisplay(true)
        console.log(data.Search)
      })
    }

    function pickMovie(imdbID) {
      fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${imdbID}&r=json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
            }
          })
          .then(resp => resp.json())
          .then((data) => {
            setMovieChoiceDisplay(false)
            setMovieChoiceList([])
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
  }

  function removeMovie(title) {
    let newMovies = movieList.filter(movie => movie.title != title)
    setMovieList(newMovies)
  }


  function createNewGroup() {
    console.log(groupName)
    if(groupName === '') {
      window.alert("You must give your group a name!")
    } else if (movieList.length < 2) {
      window.alert("Pick more movies!")
    } else if (groupMembers.length < 2) {
      window.alert("Get some friends!")
    } else {
     
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
      .then(() => history.push("/group-page"))
    }
  }

  return (
    <div id="newgroup">
      <button onClick={createNewGroup}>Create Group</button><br /><br/>
      <label>Enter your new group name:</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" onChange={handleGroupName} value={groupName}></input><br /><br />
      <label>Add your group members:</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <FormControl variant="outlined">
          <Select onChange={addMember}>
            {userList.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)}
          </Select>
        </FormControl>
      <h3>Group Members</h3>
        {groupMembers.map(id => <p key={id}>{getUserNames(id)}&nbsp;&nbsp;{id !== currentUser ? <button onClick={() => removeMember(id)}>X</button> : null}</p>)}
      <h3>Add your movie candidates</h3>
      <form onSubmit={searchMovies}>
        <input type="text" onChange={handleMovie} value={movieName}></input>
        <input type="submit" value="Search Movie"></input>
      </form>
        {movieChoiceDisplay ?  <div><h2>Which Movie Did You Want?</h2>{movieChoiceList.map(movie => <MovieChoices key={movie.Title} movie={movie} pickMovie={pickMovie}/>) }</div>: null}
      {movieList.length > 0 ?
      <div>
        <h2>Picked Movies:</h2>
        {movieList.map(movie => <div className="movieCandidate" key={movie.title}><MovieCard movie={movie}/><button onClick={() => removeMovie(movie.title)}>X</button></div>)}
      </div> : null }
    </div>
  )
}

export default NewGroup;