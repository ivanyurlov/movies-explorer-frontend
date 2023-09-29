import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList(props) {
  const location = useLocation();
  const [permissibleMovies, setPermissibleMovies] = React.useState(0);
  const [stepMovies, setStepMovies] = React.useState(0);

  function setLayoutMovies() {
    const width = window.innerWidth;
    if (location.pathname === "/saved-movies") {
      setPermissibleMovies(props.movies.length);
    } else if (width <= 767) {
      setPermissibleMovies(5);
      setStepMovies(2);
    } else if (width <= 989 && width > 767) {
      setPermissibleMovies(8);
      setStepMovies(2);
    } else if (width <= 1279 && width > 989) {
      setPermissibleMovies(12);
      setStepMovies(3);
    } else {
      setPermissibleMovies(16);
      setStepMovies(4);
    }
  }

  React.useEffect(() => {
    setLayoutMovies();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        setLayoutMovies();
      }, 500);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showMoreMovies() {
    setPermissibleMovies(permissibleMovies + stepMovies);
  }

  return (
    <section className="movies__list" aria-label="Фильмы">
      {props.movies.length > 0 ? (<div className="movies__items">
        {props.movies.map((movie, index) => {
          if (index < permissibleMovies) {
            return (<MoviesCard
              key = {movie.id || movie.movieId}
              movie = {movie}
              favoriteMovies = {props.favoriteMovies}
              setFavoriteMovies = {props.setFavoriteMovies}
              setSavedId = {props.setSavedId}
              savedId = {props.savedId}
              setIsSaved = {props.setIsSaved}
              isSaved = {props.isSaved}
              onAddMovieToggle = {props.onAddMovieToggle}
            />)
          }
        return null;
      })}
      </div>) : <div className={`movies__text ${!props.errorMessage ? "movies__text_hidden" : ""}`}>{props.errorMessage}</div>}
      {props.movies.length > permissibleMovies && location.pathname === "/movies" && (<button className="movies__button" onClick={showMoreMovies}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;