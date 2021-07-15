function MovieChoices({movie, pickMovie}) {
    
    return (
        <div className="movieChoiceCard">
            <p>{movie.Title} ({movie.Year})</p>
            <img src={movie.Poster} alt={movie.Title}></img>
            <button onClick={() => pickMovie(movie.imdbID)}>This one!</button>
        </div>
    )
}

export default MovieChoices