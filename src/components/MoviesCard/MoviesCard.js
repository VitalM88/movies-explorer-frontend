import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ onSavedMovies }) {
  const [btnState, toogleBtnState] = useState('false');

  const handleClick = () => {
    toogleBtnState(s => !s);
  };

  const btnStyle = (onSavedMovies ? "saved-movies" : (!btnState ? "is-saved" : ""));

  return (
    <li className="movie">
      <img className="movie__image" src="https://avatars.dzeninfra.ru/get-zen_doc/1594475/pub_606ea4d89d33fa0e1c702d05_606ea5eaf3166604d1af7ea0/scale_1200" alt="Видео" />
      <div className="movie__description">
        <div className="movie__text-container">
          <p className="movie__title">33 слова о дизайне</p>
          <span className="movie__duration">1ч42м</span>
        </div>
        <button 
          type="button" 
          className={`movie__save-button movie__save-button_${btnStyle}`}
          onClick={handleClick}
        >
        </button>
      </div>  
    </li>
  );
}
  
export default MoviesCard;