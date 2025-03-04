// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the Search Results page with the query as a URL parameter
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Movie App</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Popular</Link></li>
        <li><Link to="/top-rated">Top Rated</Link></li>
        <li><Link to="/upcoming">Upcoming</Link></li>
      </ul>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
