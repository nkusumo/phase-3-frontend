import { useState, useEffect } from 'react'
import GroupVoting from './GroupVoting';
import MovieCard from './MovieCard'

function GroupInfo({currentGroup, groupName}) {

    const [movieList, setMovieList] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);
    const [currentVoter, setCurrentVoter] = useState('')
    const [winnerChosen, setWinnerChosen] = useState(false)
    const [winner, setWinner] = useState({})

    useEffect(() => {
        setWinnerChosen(false)

        fetch(`http://localhost:9393/groups/${currentGroup}/movies`)
        .then(resp => resp.json())
        .then(setMovieList)

        fetch(`http://localhost:9393/groups/${currentGroup}/users`)
        .then(resp => resp.json())
        .then(setGroupUsers)
        
        fetch(`http://localhost:9393/groups/${currentGroup}/winner`)
        .then(resp => resp.json())
        .then(movie => {
            if(movie.title){
                setWinnerChosen(true)
                setWinner(movie)
            }
        })
        
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
            .then((winner) => {
                setWinnerChosen(true)
                setWinner(winner)
            })
        })
    }

    let lastVoter=currentVoter === groupUsers.length - 1

    return(
        <div id="groupInfo">
            <h1>Welcome, {groupName}</h1>
            <div id="groupMembers">
                <h2>Group Members</h2>
                {groupUsers.map(user => <p key={user.id}>{user.name}</p>)}
            </div>
            {winnerChosen ? <div id="winner"><h2>Winning Movie:</h2><MovieCard movie={winner}/> </div>: currentVoter==='' ? <button onClick={handleClick}>Start Voting!</button> : <GroupVoting handleNotLastVote={handleNotLastVote} handleLastVote={handleLastVote} lastVoter={lastVoter} currentVoter={groupUsers[currentVoter]} movieList={movieList}/>}
            <div id="groupMovies">
                <h2>Candidate Movies</h2>
                {movieList.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default GroupInfo;