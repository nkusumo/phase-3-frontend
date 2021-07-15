function MovieCard({movie}) {
    return(
        <div className="card">
            <h4>{movie.title} ({movie.release_date})</h4>
            <img src={movie.image} alt={movie.title}></img>
            <small>IMDB rating: {movie.rating}</small>
            <small>Genre: {movie.genre}</small>
        </div>
    )
}

export default MovieCard;