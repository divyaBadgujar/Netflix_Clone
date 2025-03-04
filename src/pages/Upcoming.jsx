// src/pages/Upcoming.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Error fetching upcoming movies', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="movies-container">
      <h2>Upcoming Movies</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Upcoming;
