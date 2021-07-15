function MovieChoices({movie, pickMovie}) {
    
    return (
        <>
            <p>{movie.Title} ({movie.Year})</p>
            <img src={movie.Poster} alt={movie.Title}></img>
            <button onClick={() => pickMovie(movie.imdbID)}>This one!</button>
        </>
    )
}

export default MovieChoices