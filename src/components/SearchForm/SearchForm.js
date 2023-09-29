import React from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import searchPath from '../../images/search-icon.svg';


function SearchForm(props) {
  const location = useLocation();
  const [inputValue, setInputValue] = React.useState('');
  const [shorts, setShorts] = React.useState(false);
  const [error, setError] = React.useState(false);


  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleCheckboxToggle() {
    setShorts(!shorts);
    props.onSearchMovies(inputValue, !shorts);
    if (location.pathname === '/movies') {
      localStorage.setItem('shorts', !shorts);
    }
  }

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      const savedInputValue = localStorage.getItem('keyword');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));
      if (savedInputValue) {
        setInputValue(savedInputValue);
      }
      if (savedShorts) {
        setShorts(savedShorts);
      }
      if (savedInputValue || savedShorts === true) {
        props.onSearchMovies(savedInputValue, savedShorts);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    if (!inputValue) {
      setError(true);
    } else {
      setError(false);
      if (location.pathname === '/movies') {
        localStorage.setItem('keyword', inputValue);
        props.onSearchMovies(inputValue, shorts);
      } else {
        props.onSearchMovies(inputValue, shorts);
      }
    }
  }

  return (
    <div className="search">
      <form className="search__form"  onSubmit={handleSubmit} noValidate>
        <div className="search__container">
          <input 
            className="search__input"
            value={inputValue || ''}
            onChange={handleInputChange}
            id="search" 
            autoComplete="off" 
            type="text" name="search"
            placeholder="Фильм"
            required 
          />
          <button className="search__button" type="submit">
            <img className="search__icon" alt="Иконка - поиск" src={searchPath} />
          </button>
        </div>
        <span className={`search__input-error search__input-error_hidden ${error && "search__input-error_visible"}`}>{error && "Нужно ввести ключевое слово"}</span>
        <div className="search__toggle-container">
          <label className="search__toggle">
            <input 
              className="search__checkbox"
              onChange={handleCheckboxToggle}
              id="checkbox"
              checked={shorts}
              type="checkbox" name="checkbox"
            />
            <span className="search__slider" />
          </label>
          <p className="search__filter">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;