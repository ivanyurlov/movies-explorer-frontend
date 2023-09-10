import React from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies(props) {

  return (
    <section className="saved-movies">
      <SearchForm />
      {props.isLoading ? <Preloader /> : <MoviesCardList />}
    </section>
  );
}

export default Movies;