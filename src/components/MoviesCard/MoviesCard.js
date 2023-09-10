import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.css';


function MoviesCard(props) {
  const location = useLocation();

  return (
    <div className="movie" key={props.movie._id}>
      <a className="movie__trailer" href={props.movie.trailerLink} rel="noreferrer" target="_blank">
        <img className="movie__photo" src={props.movie.image} alt={props.movie.nameRU} />
      </a>
      <div className="movie__info">
        <div className="movie__like">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
          <button className={`movie__button ${location.pathname === "/saved-movies" ? "movie__button_delete" : "" }`} type="button"></button>
        </div>
        <p className="movie__duration">{props.movie.duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;