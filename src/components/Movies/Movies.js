import React from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import searchFilter from '../../utils/SearchFilter';


function Movies(props) {
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    getSavedMovies();
  }, []);

  function getSavedMovies() {
    const jwt = localStorage.getItem("jwt");
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if (!savedMovies) {
      mainApi.getSavedMovies(jwt)
      .then((data) => {
          localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch((error) => {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      });
    }
  }


  function filter(keyword, shorts) {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const filteredMovies = searchFilter(storedMovies, keyword, shorts);
    if (filteredMovies.length === 0) {
      setErrorMessage('Ничего не найдено');
    }
    setMovies(filteredMovies)
  }

  function handleSearchMovies(keyword, shorts) {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    if (!storedMovies) {
      setIsLoading(true);
      moviesApi.getInitialMovies()
      .then((data) => {
        localStorage.setItem('movies', JSON.stringify(data));
        filter(keyword, shorts);
      })
      .catch((error) => {
        console.error(`Ошибка при загрузке фильмов: ${error}`);
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      filter(keyword, shorts);
    }
  }

  return (
    <section className="movies">
      <SearchForm
        onSearchMovies = {handleSearchMovies}
      />
      {isLoading ? <Preloader /> : <MoviesCardList 
        movies = {movies}
        favoriteMovies = {props.favoriteMovies}
        setFavoriteMovies = {props.setFavoriteMovies}
        isSaved = {props.isSaved}
        setSavedId = {props.setSavedId}
        savedId = {props.savedId}
        setIsSaved = {props.setIsSaved}
        onAddMovieToggle = {props.onAddMovieToggle}
        errorMessage = {errorMessage}
      />}
    </section>
  );
}

export default Movies;