import React from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import searchFilter from '../../utils/SearchFilter';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function SavedMovies(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [errorMessage, setErrorMessage] = React.useState('');


  React.useEffect(() => {
    getUserMovies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUserMovies() {
    const jwt = localStorage.getItem("jwt");
      mainApi.getSavedMovies(jwt)
      .then((data) => {
        if (data.length > 0) {
          localStorage.setItem('savedMovies', JSON.stringify(data));
          const userMovies = data.filter(item => item.owner === currentUser._id);
          props.setFavoriteMovies(userMovies);
        } else {
          props.setFavoriteMovies([]); //
        }
      })
      .catch((error) => {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      });
  }

  function filterMovies(keyword, shorts) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || []; //
    const filteredMovies = searchFilter(savedMovies, keyword, shorts);
    if (filteredMovies.length === 0) {
      setErrorMessage('Ничего не найдено');
    }
    props.setFavoriteMovies(filteredMovies);
  }

    function handleSearchMovies(keyword, shorts) {
        filterMovies(keyword, shorts);
    }

  return (
    <section className="saved-movies">
      <SearchForm 
        onSearchMovies = {handleSearchMovies}
      />
      <MoviesCardList 
        movies = {props.favoriteMovies}
        setFavoriteMovies = {props.setFavoriteMovies}
        setSavedId = {props.setSavedId}
        savedId = {props.savedId}
        setIsSaved = {props.setIsSaved}
        isSaved = {props.isSaved}
        onAddMovieToggle = {props.onAddMovieToggle}
        errorMessage = {errorMessage}
      />
    </section>
  );
}

export default SavedMovies;