import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import '../InfoTooltip/InfoTooltip';


function BurgerNavBar(props) {
  const location = useLocation();

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_nav">
        <button className="popup__close-button popup__close-button_black" onClick={props.onClose}></button>
        <nav className="popup__navigation">
          <ul className="popup__links">
            <li>
              <Link to={"/"} className={`popup__link ${location.pathname === "/" ? "popup__link_active" : "" }`} onClick={props.onClose}>Главная</Link>
            </li>
            <li>
              <Link to={"/movies"} className={`popup__link ${location.pathname === "/movies" ? "popup__link_active" : "" }`} onClick={props.onClose}>Фильмы</Link>
            </li>
            <li>
              <Link to={"/saved-movies"} className={`popup__link ${location.pathname === "/saved-movies" ? "popup__link_active" : "" }`} onClick={props.onClose}>Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link to={"/profile"} className="popup__link popup__link_accent" onClick={props.onClose}>Аккаунт</Link>
        </nav>
      </div>
    </div>
  );
}

export default BurgerNavBar;