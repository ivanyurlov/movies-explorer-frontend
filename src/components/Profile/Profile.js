import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../Login/Login.css';


function Profile(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfileDisabled, setIsEditProfileDisabled] = React.useState(true);

  function handleEditProfile() {
    setIsEditProfileDisabled(false);
  }

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
                placeholder="Имя"
                minLength="2" maxLength="30"
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
                placeholder="E-mail" 
                required 
              />
            </div>
            <span className="login__input-error login__input-error_hidden"></span>
          </div>
          <span className="login__edit-error login__edit-error_hidden"></span>
          {isEditProfileDisabled ? (
            <>
              <button className="login__button login__button_edit" type="submit" onClick={handleEditProfile}>Редактировать</button>
              <Link to="/" className="login__link login__link_signout" onClick={props.onSignOut}>Выйти из аккаунта</Link>
            </>
          ) : (
            <button className={`login__save-button login__save-button_edit ${!props.isValid ? "login__save-button_disabled" : ""}`} type="submit">Сохранить</button>
          )}
        </form>
        
      </div>
    </div>
  )
}

export default Profile;