import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import BurgerNavBar from '../BurgerNavBar/BurgerNavBar';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as Auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';
import { loginErrors } from '../../utils/customErrors';



function App() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isBurgerNavBarOpen, setIsBurgerNavBarOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [favoriteMovies, setFavoriteMovies] = React.useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [savedId, setSavedId] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [isEditUser, setIsEditUser] = React.useState(false);
  const [textError, setTextError] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const path = useNavigate();

  React.useEffect(() => {
    getUserInfo();
  }, [isLoggedIn]);

  function getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    mainApi.getUserInfo(jwt)
    .then((currentUser) => {
      setCurrentUser(currentUser);
    })
    .catch((error) => {
      console.error(`Ошибка при загрузке профиля: ${error}`);
    });
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsBurgerNavBarOpen(false); 
  }

  function showCheckResult() {
    setIsInfoTooltipOpen(true);
  }

  function handleBurgerButtonClick() {
    setIsBurgerNavBarOpen(true);
  }

  function successRegister() {
    setIsRegister(true);
  }

  function unsuccessRegister() {
    setIsRegister(false);
  }

  function successEditUser() {
    setIsEditUser(true);
  }

  function unsuccessEditUser() {
    setIsEditUser(false);
  }

  function onLogin(email, password) {
    Auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/movies", {replace: true});
      }
    })
    .catch((error) => {
      console.error(`Ошибка при авторизации: ${error}`);
      setTextError(loginErrors(error));
      unsuccessRegister();
      showCheckResult();
    })
  }

  function onSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('userMovies');
    localStorage.removeItem('keyword');
    localStorage.removeItem('shorts');
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    Auth.getContent(jwt)
    .then((res) => {
      if (!res) {
        return;
      }
      setIsLoggedIn(true);
      navigate(path);
    })
    .catch((error) => {
      navigate("/");
      setIsLoggedIn(false);
      setTextError(loginErrors(error));
    });
  }
 
  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddMovieToggle(movie, isSaved, setIsSaved) {
    const jwt = localStorage.getItem("jwt");
    if (!isSaved) {
      mainApi.addMovie(movie, jwt)
      .then((newMovie) => {
        Object.entries(newMovie).forEach((key) => {
          if (!key[1]) {
            newMovie[key[0]] = '...';
          }
        });
        setSavedId(newMovie._id);
        setFavoriteMovies([newMovie, ...favoriteMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([newMovie, ...favoriteMovies]));
        setIsSaved(true);
      })
      .catch((error) => {
        console.error(`Ошибка при добавлении фильма: ${error}`);
      })
    } else {
      mainApi.deleteMovie(savedId, jwt)
      .then(() => {
        setIsSaved(false);
        setFavoriteMovies((favoriteMovies) => favoriteMovies.filter((c) => (c._id !== savedId)));
        localStorage.setItem('savedMovies', JSON.stringify(favoriteMovies.filter((c) => (c._id !== savedId))));
      })
      .catch((error) => {
        console.error(`Ошибка при удалении фильма: ${error}`);
      })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/signup" || location.pathname === "/signin" || location.pathname === "/profile") && 
          <Header
            isLoggedIn = {isLoggedIn}
            onBurgerNavBar = {handleBurgerButtonClick}
            isOpen = {isBurgerNavBarOpen}
          />}
          <Routes>
            <Route path="/" element={<Main />} />
            {!isLoggedIn && <Route path="/signup" element={
              <Register
                successRegister = {successRegister}
                unsuccessRegister = {unsuccessRegister}
                showCheckResult = {showCheckResult}
                setTextError = {setTextError}
                onLogin = {onLogin}
              />
            } />}
            {!isLoggedIn && <Route path="/signin" element={
              <Login
                unsuccessRegister = {unsuccessRegister}
                showCheckResult = {showCheckResult}
                setTextError = {setTextError}
                onLogin = {onLogin}
              />
            } />}
            <Route path="*" element={<PageNotFound />} />
            <Route path="/movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={
                <Movies
                  favoriteMovies = {favoriteMovies}
                  setFavoriteMovies = {setFavoriteMovies}
                  setSavedId = {setSavedId}
                  savedId = {savedId}
                  onAddMovieToggle = {handleAddMovieToggle}
                />
              } /> 
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={
                <SavedMovies
                  favoriteMovies = {favoriteMovies}
                  setFavoriteMovies = {setFavoriteMovies}
                  setSavedId = {setSavedId}
                  savedId = {savedId}
                  onAddMovieToggle = {handleAddMovieToggle}
                />
              } /> 
            } />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={
                <Profile
                  successEditUser = {successEditUser}
                  unsuccessEditUser = {unsuccessEditUser}
                  setCurrentUser = {setCurrentUser}
                  showCheckResult = {showCheckResult}
                  onSignOut = {onSignOut}
                  setTextError = {setTextError}
                />
              } /> 
            } />
          </Routes>
          {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies") && <Footer />}
          {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile") && 
          <BurgerNavBar 
            isOpen = {isBurgerNavBarOpen}
            onClose = {closeAllPopups} 
          />}
          <InfoTooltip
            isRegister = {isRegister}
            isLoggedIn = {isLoggedIn}
            isEditUser = {isEditUser}
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            textError = {textError}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;