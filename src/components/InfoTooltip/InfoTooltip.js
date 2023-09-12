import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import successIconPath from '../../images/Success-Icon.svg';
import unsuccessIconPath from '../../images/Unsuccess-Icon.svg';
import './InfoTooltip.css';

function InfoTooltip(props) {
  const location = useLocation();

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_info">
        {location.pathname === "/signup" && <Link to={props.isRegister ? "/signin" : "/signup"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        {location.pathname === "/signin" && <Link to={props.isRegister ? "/" : "/signin"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        {location.pathname === "/profile" && <Link to={props.isRegister ? "/" : "/profile"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        <img className="popup__icon" alt="Иконка успешности" src={props.isRegister ? successIconPath : unsuccessIconPath} />
        <h2 className="popup__title popup__title_info">
          {props.isRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;