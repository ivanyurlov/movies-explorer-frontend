import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './Header.css';
import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname !== "/" ? "header_theme_white" : "" }`}>
      <Link to="/"><img className={`header__logo ${location.pathname === "/signup" || location.pathname === "/signin" ? "header__logo_auth" : "" }`} alt="Логотип" src={logoPath} /></Link>
      {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile") && 
      <Navigation
        isLoggedIn = {props.isLoggedIn}
        onBurgerNavBar = {props.onBurgerNavBar}
      />}
    </header>
  );
}

export default Header;