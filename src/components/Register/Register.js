import React from 'react';
import { Link } from 'react-router-dom';

import '../Login/Login';
import useFormValidation from '../../utils/useFormValidation';
import * as Auth from '../../utils/Auth';
import { registerErrors } from '../../utils/customErrors';


function Register(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    Auth.register(values.name, values.email, values.password)
    .then((data) => {
      props.successRegister();
      props.showCheckResult();
      props.setTextError('Вы успешно зарегистрировались!');
    })
    .catch((error) => {
      props.setTextError(registerErrors(error));
      props.unsuccessRegister();
      props.showCheckResult();
      resetForm();
    })
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Добро пожаловать!</h2>
        <form 
        onSubmit={handleSubmit} 
        className="login__form">
          <label htmlFor="name" className="login__label">Имя</label>
          <input 
            className="login__input"
            value={values?.name || ''}
            onChange={handleChange} 
            id="name" 
            autoComplete="off" 
            type="text" name="name"
            placeholder="Имя"
            minLength="2" maxLength="30"
            pattern="^[A-Za-zА-Яа-я\\s]{2,30}$"
            required 
          />
          <span className={`login__input-error login__input-error_hidden ${errors?.name && "login__input-error_visible"}`}>{errors.name}</span>
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
          <button className={`login__save-button ${!isValid ? "login__save-button_disabled" : ""}`} type="submit">Зарегистрироваться</button>
        </form>
        <p className="login__caption">
          Уже зарегистрированы?
          <Link to="/signin" className="login__link">Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;