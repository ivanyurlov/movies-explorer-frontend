import React from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { initialMovies } from '../initialMovies';


function MoviesCardList(props) {

  return (
    <section className="movies__list" aria-label="Фильмы">
      {initialMovies.length > 0 ? (<div className="movies__items">
        {initialMovies.map((movie) => (
          <MoviesCard
            key = {movie._id}
            movie = {movie}
            //onMovieDelete = {props.onMovieDelete}
          />
        ))}
      </div>) : <div className="movies__text">Ничего не найдено</div>}
      {initialMovies.length > 5 && <button className="movies__button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;