import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './InfoTooltip.css';
import successIconPath from '../../images/Success-Icon.svg';
import unsuccessIconPath from '../../images/Unsuccess-Icon.svg';


function InfoTooltip(props) {
  const location = useLocation();

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_info">
        {location.pathname === "/signup" && <Link to={props.isRegister ? "/signin" : "/signup"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        {location.pathname === "/signin" && <Link to={props.isLoggedIn ? "/movies" : "/signin"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        {location.pathname === "/profile" && <Link to={props.isEditUser ? "/movies" : "/profile"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        {location.pathname === "/signup" && <img className="popup__icon" alt="Иконка успешности" src={props.isRegister ? successIconPath : unsuccessIconPath} />}
        {location.pathname === "/signin" && <img className="popup__icon" alt="Иконка успешности" src={props.isLoggedIn ? successIconPath : unsuccessIconPath} />}
        {location.pathname === "/profile" && <img className="popup__icon" alt="Иконка успешности" src={props.isEditUser ? successIconPath : unsuccessIconPath} />}
        {location.pathname === "/signup" && <h2 className="popup__title popup__title_info">
          {props.textError}
        </h2>}
        {location.pathname === "/signin" && <h2 className="popup__title popup__title_info">
          {props.textError}
        </h2>}
        {location.pathname === "/profile" && <h2 className="popup__title popup__title_info">
          {props.textError}
        </h2>}
      </div>
    </div>
  );
}

export default InfoTooltip;