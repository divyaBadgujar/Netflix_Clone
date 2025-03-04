// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={IMAGE_BASE + movie.poster_path} alt={movie.title} />
        <h4>{movie.title}</h4>
        <p className="movie-rating">Rating: {movie.vote_average} / 10</p>
      </Link>
    </div>
  );
};

export default MovieCard;
