import { useState } from "react";

function GroupVoting({currentVoter, movieList, lastVoter, handleNotLastVote, handleLastVote}) {

    const [ranking, setRanking] = useState({first: 'default', second: 'default', third: 'default'});

    function handleChange(e) {
        let newObj = {
            ...ranking,
            [e.target.name]: e.target.value
        }
        setRanking(newObj)
    }

    return (
        <>
        <h2>Hello, {currentVoter.name}</h2>
        <form onSubmit={(e) => {
                e.preventDefault()
                let userRanks = {...ranking}
                setRanking({first: 'default', second: 'default', third: 'default'})
                !lastVoter ? handleNotLastVote(userRanks) : handleLastVote(userRanks)
            }}>
            <div id="flexVote">
                <div className ="flexVoteChild">
                    <label>Rank 1: </label>
                    <select name="first" onChange={handleChange} value={ranking.first}>
                        <option value="default" disabled>Select here</option>
                        {movieList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                    </select>
                    <br />
                    <label>Rank 2: </label>
                    <select name="second" onChange={handleChange} value={ranking.second}>
                        <option value="default" disabled>Select here</option>
                        {movieList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                    </select>
                    <br />
                    <label>Rank 3: </label>
                    <select name="third" onChange={handleChange} value={ranking.third}>
                        <option value="default" disabled>Select here</option>
                        {movieList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                    </select>
                </div>
                <div className ="flexVoteChild">
                    {!lastVoter ? <input type="submit" value="Submit your votes!"></input> : <input type="submit" value="Calculate Winner!"></input>}
                </div>
            </div>
        </form>
        </>
    )
}

export default GroupVoting;