function Home({currentName}) {
    document.title = "Netflix and Choose | Home"
    return (
        <div className="homeContent">
            <h1>{currentName ? `Welcome to Pick-a-Flick, ${currentName}!`:"Welcome to Pick-a-Flick!"}</h1>
            <p>This App will allow a gathering of friends to vote, using ranked-choice voting, on a movie to watch.</p>
            <p>Users can generate their own group, adding friends and movies to each distinct group.</p>
        </div>
    )
}

export default Home