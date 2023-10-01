import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import useFormValidation from '../../utils/useFormValidation';


function Login(props) {
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin(values.email, values.password);
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Рады видеть!</h2>
        <form 
        onSubmit={handleSubmit} 
        className="login__form">
          <label htmlFor="email" className="login__label">E-mail</label>
          <input 
            className="login__input"
            value={values?.email || ''}
            onChange={handleChange} 
            id="email" 
            autoComplete="off" 
            type="email" name="email"
            placeholder="E-mail"
            pattern="^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$"
            required 
          />
          <span className={`login__input-error login__input-error_hidden ${errors?.email && "login__input-error_visible"}`}>{errors.email}</span>
          <label htmlFor="password" className="login__label">Пароль</label>
          <input 
            className="login__input"
            value={values?.password || ''}
            onChange={handleChange} 
            id="password" 
            autoComplete="off" 
            type="password" name="password"
            placeholder="Пароль"
            minLength="4"
            required 
          />
          <span className={`login__input-error login__input-error_hidden ${errors?.password && "login__input-error_visible"}`}>{errors.password}</span>
          <button className={`login__save-button login__save-button_modify ${!isValid ? "login__save-button_disabled" : ""}`} type="submit">Войти</button>
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