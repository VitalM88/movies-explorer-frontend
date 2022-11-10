import React, { useState, useEffect } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.svg';

function Navigation({ state }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [btnState, setBtnState] = useState('false');

  const handleClick = () => {
    setBtnState(s => !s);
  };

  const navBarState = (btnState ? "noactive" : "active");

  const updateWindowWidth = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  });



  return (
    <>
      {
        state === "header_main" ? (
          <div className="navigation navigation_main">
            <Link to="/signup" className="navigation__link">Регистрация</Link>
            <Link to="/signin" className="navigation__link">
              <button className="navigation__button">Войти</button>
            </Link>
          </div>
        ) : ''
      }
      {
        state === "header_nav" ? (
          (windowWidth > 800) ? (
            <div className="navigation navigation_nav">
              <Link to="/movies" className="navigation__link">Фильмы</Link>
              <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
              <Link to="/profile" className="navigation__profile-btn">
                <img className="navigation__icon" src={profileIcon} alt="Иконка"></img>
                Аккаунт
              </Link>
            </div>
          ) : (
            <div>
              {
                (navBarState === "noactive") ? (
                  <button 
                    type='button' 
                    onClick={handleClick} 
                    className="navigation__toogle-btn"
                  >           
                  </button>
                ) : ''
              }
              {
                (navBarState === "active") ? (
                  <div className="navigation__mobile">
                    <div className="navigation__mobile-container">
                      <button 
                        type='button' 
                        onClick={handleClick} 
                        className={`navigation__toogle-btn navigation__toogle-btn_state_${navBarState}`}
                      >           
                      </button>
                      <Link to="/" className="navigation__link">Главная</Link>
                      <Link to="/movies" className="navigation__link">Фильмы</Link>
                      <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
                      <Link to="/profile" className="navigation__profile-btn navigation__profile-btn_state_mobile ">
                        <img className="navigation__icon" src={profileIcon} alt="Иконка"></img>
                        Аккаунт
                      </Link>
                    </div>
                  </div>
                ) : ''
              }
            </div>
          )  
        ) : ''
      }
    </>
  );
}
  
export default Navigation;