import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
//import ProtectedRoute from '../ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import BurgerNavBar from '../BurgerNavBar/BurgerNavBar';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


function App() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isBurgerNavBarOpen, setIsBurgerNavBarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const location = useLocation();


  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsBurgerNavBarOpen(false); 
  }

  //function showCheckResult() {
  //  setIsInfoTooltipOpen(true);
  //}

  function handleBurgerButtonClick() {
    setIsBurgerNavBarOpen(true);
  }

  //function successRegister() {
  //  setIsRegister(true);
  //}

  //function unsuccessRegister() {
  //  setIsRegister(false);
  //}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          {(location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/signup" || location.pathname === "/signin" || location.pathname === "/profile") && 
          <Header
            isLoggedIn = {isLoggedIn}
            //onSignOut = {onSignOut}
            onBurgerNavBar = {handleBurgerButtonClick}
            isOpen = {isBurgerNavBarOpen}
          />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={
              <Register
                //successRegister = {successRegister}
                //unsuccessRegister = {unsuccessRegister}
                //showCheckResult = {showCheckResult}
              />
            } />
            <Route path="/signin" element={
              <Login
                //unsuccessRegister = {unsuccessRegister}
                //handleLogin = {() => setIsLoggedIn(true)}
                //showCheckResult = {showCheckResult}
              />
            } />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/movies" element={
              //<ProtectedRoute isLoggedIn={isLoggedIn} element={
                <Movies
                  isLoggedIn = {isLoggedIn}
                  isLoading = {isLoading}
                />
              } /> 
            {/*} />*/}
            <Route path="/saved-movies" element={
              //<ProtectedRoute isLoggedIn={isLoggedIn} element={
                <SavedMovies
                 isLoggedIn = {isLoggedIn}
                />
              } /> 
            {/*} />*/}
            <Route path="/profile" element={
              //<ProtectedRoute isLoggedIn={isLoggedIn} element={
                <Profile
                  //unsuccessRegister = {unsuccessRegister}
                  //handleLogin = {() => setIsLoggedIn(true)}
                  //showCheckResult = {showCheckResult}
                  //onSignOut = {onSignOut}
                />
              //} /> 
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
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;