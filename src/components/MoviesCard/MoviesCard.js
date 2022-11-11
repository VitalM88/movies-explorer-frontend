import React, { useState } from 'react';
import './MoviesCard.css';
import { apiSettings } from "../../utils/constans";

function MoviesCard({ onSavedMovies, movie }) {
  const [btnState, toogleBtnState] = useState('false');

  const handleClick = () => {
    toogleBtnState(s => !s);
  };

  const btnStyle = (onSavedMovies ? "saved-movies" : (!btnState ? "is-saved" : ""));

  return (
    <li className="movie">
      <a className="movie__image-container" href={movie.trailerLink} target="_blank">
        <img 
          className="movie__image" 
          src={`${apiSettings.moviesUrl}${movie.image.url}`} 
          alt="Видео" 
        />
      </a>
      <div className="movie__description">
        <div className="movie__text-container">
          <p className="movie__title">{`${movie.nameRU}`}</p>
          <span className="movie__duration">
            {`${Math.floor(movie.duration/60)}ч${movie.duration%60}м`}
          </span>
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