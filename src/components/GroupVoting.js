import { useState } from "react";

function GroupVoting({currentVoter, movieList}) {

    const [ranking, setRanking] = useState({first: '', second: '', third: ''});

    return (
        <>
        <h2>Hello, {currentVoter.name}</h2>
        <form>
            <select></select>
        </form>
        </>
    )
}

export default GroupVoting;