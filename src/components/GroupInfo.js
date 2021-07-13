import { useState, useEffect } from 'react'
import GroupVoting from './GroupVoting';
import MovieCard from './MovieCard'

function GroupInfo({currentGroup}) {

    const [movieList, setMovieList] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [currentVoter, setCurrentVoter] = useState('')

    useEffect(() => {
        console.log('I happened')
        fetch(`http://localhost:9393/groups/${currentGroup}/movies`)
        .then(resp => resp.json())
        .then(setMovieList)

        fetch(`http://localhost:9393/groups/${currentGroup}/users`)
        .then(resp => resp.json())
        .then(setGroupUsers) 
      }, [currentGroup])


      function handleClick(e) {
        setCurrentVoter(0)
        console.log("click")
    }
    console.log(currentVoter)
    
    return(
        <>
            <h1>Hi {currentGroup}</h1>
            <div>
                <h2>Group Members</h2>
                <ul>
                    {groupUsers.map(user => <li>{user.name}</li>)}
                </ul>
            </div>
            <div>
                <h2>Candidate Movies</h2>
                {movieList.map(movie => <MovieCard movie={movie} />)}
            </div>
            {currentVoter==='' ? <button onClick={handleClick}>Start Voting!</button> : <GroupVoting currentVoter={groupUsers[currentVoter]} movieList={movieList}/>}
        </>
    )
}

export default GroupInfo;