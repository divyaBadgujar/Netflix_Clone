
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TopRated from './pages/Toprated';
import Upcoming from './pages/Upcoming';
import MovieDetail from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </main>
  </>
  );
}

export default App;
