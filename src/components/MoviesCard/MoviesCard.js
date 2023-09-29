import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';


function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(false);
  const location = useLocation();
  const pathImage = location.pathname === "/movies" ? `https://api.nomoreparties.co/${props.movie.image.url}` : props.movie.image;

  function durationConvert(minutes) {
    return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
  }

  function handleAddMovieClick() {
    if (!isSaved) {
      setIsSaved(true);
      props.onAddMovieToggle(props.movie, isSaved);
    } else {
      setIsSaved(false);
      props.onAddMovieToggle(props.movie, isSaved);
    }
  }

  React.useEffect(() => {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
      const moviesSaved = savedMovies.filter((element) => {
        return element.movieId === props.movie.id || element._id === props.movie._id;
      })
        if (moviesSaved.length > 0) {
          moviesSaved.forEach(item => {
          if (item.movieId === props.movie.id || item._id === props.movie._id) {
            props.setSavedId(item._id);
            setIsSaved(true);
          }
        });
      } else {
        setIsSaved(false);
      }
  }, [props, props.movie.id, props.movie._id, location.pathname])

  return (
    <div className="movie" key={props.movie.id || props.movie.movieId}>
      <a className="movie__trailer" href={props.movie.trailerLink} rel="noreferrer" target="_blank">
        <img className="movie__photo" src={pathImage} alt={props.movie.nameRU} />
      </a>
      <div className="movie__info">
        <div className="movie__like">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
          {location.pathname === "/movies" && <button className={`movie__button ${isSaved ? "movie__button_save" : ""}`} type="button" onClick={handleAddMovieClick}></button>}
          {location.pathname === "/saved-movies" && <button className="movie__button movie__button_delete" type="button" onClick={handleAddMovieClick}></button>}
        </div>
        <p className="movie__duration">{durationConvert(props.movie.duration)}</p>
      </div>
    </div>
  );
}

export default MoviesCard;