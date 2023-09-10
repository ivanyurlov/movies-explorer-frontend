import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../Login/Login.css';


function Profile(props) {
  const [currentUser, setCurrentUser] = React.useState({});

  return (
    <div className="login">
      <div className="login__container login__container_modify">
        <h2 className="login__title login__title_modify">Привет, {currentUser.name}!</h2>
        <form 
        //onSubmit={handleSubmit} 
        className="login__form login__form_modify">
          <div className="login__item">
            <div className="login__field">
              <label htmlFor="name" className="login__label login__label_modify">Имя</label>
              <input 
                className="login__input login__input_modify"
                //value={formValue.name}
                //onChange={handleChange} 
                id="name" 
                autoComplete="off" 
                type="text" name="name" 
                required 
              />
            </div>
            <span className="login__input-error login__input-error_hidden"></span>
          </div>
          <div className="login__item">
            <div className="login__field login__field_modify">
              <label htmlFor="email" className="login__label login__label_modify">E-mail</label>
              <input 
                className="login__input login__input_modify"
                //value={formValue.email}
                //onChange={handleChange} 
                id="email" 
                autoComplete="off" 
                type="email" name="email" 
                required 
              />
            </div>
            <span className="login__input-error login__input-error_visible">Что-то пошло не так</span>
          </div>
          <button className="login__save-button login__save-button_edit" type="submit">Редактировать</button>
        </form>
        <Link to="/" className="login__save-button login__save-button_signout" onClick={props.onSignOut}>Выйти из аккаунта</Link>
      </div>
    </div>
  )
}

export default Profile;