// src/pages/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [cast, setCast] = useState([]);

  // Fetch movie details
  const fetchMovieDetail = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovieDetail(res.data);
    } catch (error) {
      console.error("Error fetching movie detail", error);
    }
  };

  // Fetch cast details
  const fetchCast = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCast(res.data.cast.slice(0, 10)); // limiting to 10 cast members
    } catch (error) {
      console.error("Error fetching movie cast", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCast();
  }, [id]);

  if (!movieDetail) return <div>Loading...</div>;

  // Format the release date (e.g., "Thu Sep 30 2021")
  const formattedDate = new Date(movieDetail.release_date).toDateString();

  return (
    <>
      <div className="movie-detail-container">
        {/* Usual layout remains unchanged */}
        <div className="top-section">
          <div className="left-column">
            <img
              src={`${IMAGE_BASE}${movieDetail.poster_path}`}
              alt={movieDetail.title}
            />
          </div>
          <div className="right-column">
            <h2>{movieDetail.title}</h2>
            <p className="movie-rating">
              Rating: {movieDetail.vote_average}
            </p>
            <div className="timing-genres">
                <p className="movie-timing">
                <span className="duration-box">
                    {movieDetail.runtime ? `${movieDetail.runtime} min` : 'N/A'}
                </span>
                </p>
                <p className="movie-genres">
                    {movieDetail.genres.map(genre => genre.name).join(', ')}
                </p>
            </div>
            <p className="movie-release-date">
              Release Date: {formattedDate}
            </p>
          </div>
        </div>
        <div className="overview-section">
          <h3>Overview</h3>
          <p>{movieDetail.overview}</p>
        </div>

        {/* Additional Poster (covers right half of container) */}
        <div className="additional-poster">
          <img
            src={`${IMAGE_BASE}${movieDetail.poster_path}`}
            alt="Additional Poster"
          />
        </div>
      </div>

      {/* Separate Cast Container */}
      <div>
        <h3>Cast</h3>
        <div className="cast-list">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE}${actor.profile_path}`
                    : "https://via.placeholder.com/100"
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p className="character-name">Character {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
