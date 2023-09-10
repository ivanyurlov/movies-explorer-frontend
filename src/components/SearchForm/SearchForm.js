import React from 'react';

import './SearchForm.css';
import searchPath from '../../images/search-icon.svg';


function SearchForm(props) {

  return (
    <div className="search">
      <form className="search__form">
        <div className="search__container">
          <input 
            className="search__input"
            //value={formValue.search}
            //onChange={handleSearchChange} 
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
        <div className="search__toggle-container">
          <label className="search__toggle">
            <input 
              className="search__checkbox"
              //value={formValue.checkbox}
              //onChange={handleCheckboxChange} 
              id="checkbox"
              //checked="toggle"
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