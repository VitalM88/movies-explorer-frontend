import './Navigation.css';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.svg';

function Navigation({ state }) {
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
          <div className="navigation navigation_nav">
            <Link to="/movies" className="navigation__link">Фильмы</Link>
            <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
            <Link to="/profile" className="navigation__link navigation__link_type_btn">
              <img className="navigation__icon" src={profileIcon} alt="Иконка"></img>
              Аккаунт
            </Link>
          </div>
        ) : ''
      }
    </>
  );
}
  
export default Navigation;