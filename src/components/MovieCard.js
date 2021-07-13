function MovieCard({movie}) {
    return(
        <>
            <h3>{movie.title} ({movie.release_date})</h3>
            <img src={movie.image}></img><br />
            <small>IMDB rating: {movie.rating}</small><br />
            <small>Genre: {movie.genre}</small>
        </>
    )
}

export default MovieCard;