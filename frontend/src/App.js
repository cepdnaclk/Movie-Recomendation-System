import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Movie from './components/Movie';
import { TRENDING_API, SEARCH_API } from "./api/movieDataBase";
import { Modal } from './components/Modal';
import Login from './Login';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [movieClicked, setMovieClicked] = useState();
  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    if (isAuthenticated) {
      fetchMoviesFromApi(TRENDING_API);
    }
  }, [isAuthenticated]);

  const fetchMoviesFromApi = (API) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== '') {
      fetchMoviesFromApi(SEARCH_API + searchTerm);
      setSearchTerm('');
    } else {
      fetchMoviesFromApi(TRENDING_API);
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnClickMovie = (movie, poster) => {
    const movieWithPosterSrc = { ...movie, finalPoster: poster };
    setMovieClicked(movieWithPosterSrc);
  };

  const onClickModalContainer = () => {
    setMovieClicked(null);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/movies"
            element={
              isAuthenticated ? (
                <div>
                  <header>
                    <form onSubmit={handleOnSubmit}>
                      <div>
                        <h1 className="brandName">Movie<span className="brandName2">TIME</span></h1>
                      </div>
                      <input
                        className="search-box"
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleOnChange}
                      />
                    </form>
                  </header>
                  <div className="movie-container">
                    {movies.length > 0 && movies.map(movie => (
                      <Movie key={movie.id} movieData={movie} handleOnMovieClick={handleOnClickMovie} />
                    ))}
                  </div>
                  {movieClicked && (
                    <div className="modal_container">
                      <Modal movie={movieClicked} onClickModalContainer={onClickModalContainer} />
                    </div>
                  )}
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
