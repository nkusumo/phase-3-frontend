import { useState, useEffect } from 'react'
import GroupVoting from './GroupVoting';
import MovieCard from './MovieCard'

function GroupInfo({currentGroup}) {

    const [movieList, setMovieList] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [currentVoter, setCurrentVoter] = useState('')

    useEffect(() => {
        fetch(`http://localhost:9393/groups/${currentGroup}/movies`)
        .then(resp => resp.json())
        .then(setMovieList)

        fetch(`http://localhost:9393/groups/${currentGroup}/users`)
        .then(resp => resp.json())
        .then(setGroupUsers) 
      }, [currentGroup])


    function handleClick(e) {
        setCurrentVoter(0)
    }

    function handleNotLastVote(ranking) {
        let userID = groupUsers[currentVoter].id
        let groupID = currentGroup

        console.log({...ranking, user_id: userID, group_id: groupID})

        fetch('http://localhost:9393/votes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...ranking,
                user_id: userID,
                group_id: groupID
            })
        })
        .then(resp => resp.json())
        .then(console.log)
        setCurrentVoter(currentVoter => currentVoter += 1)
    }

    function handleLastVote(ranking) {
        let userID = groupUsers[currentVoter].id
        let groupID = currentGroup

        console.log({...ranking, user_id: userID, group_id: groupID})

        fetch('http://localhost:9393/votes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...ranking,
                user_id: userID,
                group_id: groupID
            })
        })
        .then(resp => resp.json())
        .then(() => {
            fetch(`http://localhost:9393/winner/${groupID}`)
            .then(resp => resp.json())
            .then(console.log)
        })
    }
    
    return(
        <>
            <h1>Hi {currentGroup}</h1>
            <div>
                <h2>Group Members</h2>
                <ul>
                    {groupUsers.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
            </div>
            <div>
                <h2>Candidate Movies</h2>
                {movieList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            {currentVoter==='' ? <button onClick={handleClick}>Start Voting!</button> : <GroupVoting handleNotLastVote={handleNotLastVote} handleLastVote={handleLastVote} lastVoter={currentVoter === groupUsers.length - 1} currentVoter={groupUsers[currentVoter]} movieList={movieList}/>}
        </>
    )
}

export default GroupInfo;