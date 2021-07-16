import { useState } from "react";
import Select from 'react-select'

function GroupVoting({currentVoter, movieList, lastVoter, handleNotLastVote, handleLastVote}) {

    const [ranking, setRanking] = useState({first: 'default', second: 'default', third: 'default'});

    function handleChange(e) {
        let newObj = {
            ...ranking,
            [e.target.name]: e.target.value
        }
        setRanking(newObj)
    }

    // function handleChange(e) {
    //     console.log(e)
    //     let newObj = {
    //         ...ranking,
    //         [e.name]: e.value
    //     }
    //     setRanking(newObj)
    // }

    // const options1 = movieList.map(movie => ({value: movie.id, label: movie.title, name: 'first'}))
    // const options2 = movieList.map(movie => ({value: movie.id, label: movie.title, name: 'second'}))
    // const options3 = movieList.map(movie => ({value: movie.id, label: movie.title, name: 'third'}))

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
                    {/* <label>Rank 1: </label>
                    <Select name="first" onChange={handleChange} options={options1}/>
                    <br />
                    <label>Rank 2: </label>
                    <Select name="first" onChange={handleChange} options={options2}/>
                    <br />
                    <label>Rank 3: </label>
                    <Select name="first" onChange={handleChange} options={options3}/> */}
                    <label>Rank 1: </label>&nbsp;&nbsp;
                    <select name="first" onChange={handleChange} value={ranking.first}>
                        <option value="default" disabled>Select here</option>
                        {movieList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                    </select>
                    <br />
                    <label>Rank 2: </label>&nbsp;&nbsp;
                    <select name="second" onChange={handleChange} value={ranking.second}>
                        <option value="default" disabled>Select here</option>
                        {movieList.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                    </select>
                    <br />
                    <label>Rank 3: </label>&nbsp;&nbsp;
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