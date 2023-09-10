import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './Navigation.css';

function Navigation(props) {
  const location = useLocation();

  return (
    <>
      {props.loggedIn ? (<nav className="navigation">
        <div className="navigation__container">
          <div className="navigation__links">
            <Link to="/movies" className={`navigation__link navigation__link_modify ${location.pathname !== "/" ? "navigation__link_theme_white" : ""}`}>Фильмы</Link>
            <Link to="/saved-movies" className={`navigation__link ${location.pathname !== "/" ? "navigation__link_theme_white" : ""}`}>Сохранённые фильмы</Link>
          </div>
          <Link to="/profile" className="navigation__button">Аккаунт</Link>
        </div>
        <button className={`navigation-burger ${props.isOpen ? "navigation-burger_hidden" : ""} ${location.pathname !== "/" ? "navigation-burger_theme_white" : ""}`} onClick={props.onBurgerNavBar}>
          <span className={`navigation-burger__item ${location.pathname !== "/" ? "navigation-burger__item_theme_white" : ""}`}></span>
        </button>
      </nav>) : (
      <nav className="navigation">
        <div className="navigation__container navigation__container_modify">
          <div className="navigation__links">
            {location.pathname === "/" && <Link to="/signup" className="navigation__link navigation__link_modify">Регистрация</Link>}
          </div>
          {location.pathname === "/" && <Link to="/signin" className="navigation__button navigation__button_modify">Войти</Link>}
        </div>
      </nav>
      )}
    </>
  );
}

export default Navigation;