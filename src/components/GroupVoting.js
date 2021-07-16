import { useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
                    <label>Rank 1: </label>&nbsp;&nbsp;
                    <FormControl variant="outlined">
                        <Select name="first" onChange={handleChange} value={ranking.first}>
                            {movieList.map(movie => <MenuItem key={movie.id} value={movie.id}>{movie.title}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <label>Rank 2: </label>&nbsp;&nbsp;
                    <FormControl variant="outlined">
                        <Select name="second" onChange={handleChange} value={ranking.second}>
                            {movieList.map(movie => <MenuItem key={movie.id} value={movie.id}>{movie.title}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <label>Rank 3: </label>&nbsp;&nbsp;
                    <FormControl variant="outlined">
                        <Select name="third" onChange={handleChange} value={ranking.third}>
                            {movieList.map(movie => <MenuItem key={movie.id} value={movie.id}>{movie.title}</MenuItem>)}
                        </Select>
                    </FormControl>
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