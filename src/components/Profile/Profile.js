import React from 'react';
import { Link } from 'react-router-dom';

import '../Login/Login.css';
import useFormValidation from '../../utils/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import { profileErrors } from '../../utils/customErrors';


function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditProfileDisabled, setIsEditProfileDisabled] = React.useState(true);
  const { values, setValues, handleChange, errors, isValid } = useFormValidation();

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues])

  function handleEditProfile() {
    setIsEditProfileDisabled(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (currentUser.name !== values.name || currentUser.email !== values.email) {
      setIsEditProfileDisabled(false);
      const jwt = localStorage.getItem("jwt");
      mainApi.editUserInfo(values.name, values.email, jwt)
      .then((currentUser) => {
        props.successEditUser();
        props.showCheckResult();
        props.setCurrentUser(currentUser);
        props.setTextError('Вы успешно изменили свои данные!');
      })
      .catch((error) => {
        props.setTextError(profileErrors(error));
        props.unsuccessEditUser();
        props.showCheckResult();
      })
    } else {
      setIsEditProfileDisabled(true);
    }
  }

  return (
    <div className="login">
      <div className="login__container login__container_modify">
        <h2 className="login__title login__title_modify">Привет, {currentUser.name}!</h2>
        <form 
        onSubmit={handleSubmit} 
        className="login__form login__form_modify">
          <div className="login__item">
            <div className="login__field">
              <label htmlFor="name" className="login__label login__label_modify">Имя</label>
              <input 
                className="login__input login__input_modify"
                value={values?.name || ''}
                onChange={handleChange} 
                id="name" 
                autoComplete="off" 
                type="text" name="name"
                placeholder="Имя"
                minLength="2" maxLength="30"
                disabled={isEditProfileDisabled}
                pattern="^[A-Za-zА-Яа-я\\s]{2,30}$"
                required 
              />
            </div>
            <span className={`login__input-error login__input-error_hidden ${errors?.name && "login__input-error_visible"}`}>{errors.name}</span>
          </div>
          <div className="login__item">
            <div className="login__field login__field_modify">
              <label htmlFor="email" className="login__label login__label_modify">E-mail</label>
              <input 
                className="login__input login__input_modify"
                value={values?.email || ''}
                onChange={handleChange} 
                id="email" 
                autoComplete="off" 
                type="email" name="email"
                placeholder="E-mail"
                disabled={isEditProfileDisabled}
                pattern="^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$"
                required 
              />
            </div>
            <span className={`login__input-error login__input-error_hidden ${errors?.email && "login__input-error_visible"}`}>{errors.email}</span>
          </div>
            <span className="login__edit-error login__edit-error_hidden"></span>
          {isEditProfileDisabled ? (
            <>
              <button className="login__button login__button_edit" type="button" onClick={handleEditProfile}>Редактировать</button>
              <Link to="/" className="login__link login__link_signout" onClick={props.onSignOut}>Выйти из аккаунта</Link>
            </>
          ) : (
            <button className={`login__save-button login__save-button_edit ${!isValid ? "login__save-button_disabled" : ""}`} type="submit">Сохранить</button>
          )}
        </form>
        
      </div>
    </div>
  )
}

export default Profile;