import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';


function Login(props) {

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Рады видеть!</h2>
        <form 
        //onSubmit={handleSubmit} 
        className="login__form">
          <label htmlFor="email" className="login__label">E-mail</label>
          <input 
            className="login__input"
            //value={formValue.email}
            //onChange={handleChange} 
            id="email" 
            autoComplete="off" 
            type="email" name="email" 
            required 
          />
          <span className="login__input-error login__input-error_hidden"></span>
          <label htmlFor="password" className="login__label">Пароль</label>
          <input 
            className="login__input"
            //value={formValue.password}
            //onChange={handleChange} 
            id="password" 
            autoComplete="off" 
            type="password" name="password" 
            required 
          />
          <span className="login__input-error login__input-error_visible">Что-то пошло не так</span>
          <button className="login__save-button login__save-button_modify" type="submit">Войти</button>
        </form>
        <p className="login__caption">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__link">Регистрация</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;