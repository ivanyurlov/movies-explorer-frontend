import React from 'react';
import { Link } from 'react-router-dom';

import '../Login/Login';


function Register(props) {

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Добро пожаловать!</h2>
        <form 
        //onSubmit={handleSubmit} 
        className="login__form">
          <label htmlFor="name" className="login__label">Имя</label>
          <input 
            className="login__input"
            //value={formValue.name}
            //onChange={handleChange} 
            id="name" 
            autoComplete="off" 
            type="text" name="name" 
            required 
          />
          <span className="login__input-error login__input-error_hidden"></span>
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
          <button className="login__save-button" type="submit">Зарегистрироваться</button>
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