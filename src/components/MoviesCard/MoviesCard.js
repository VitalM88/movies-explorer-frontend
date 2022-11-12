import React, { useState } from 'react';
import './MoviesCard.css';
import { apiSettings } from "../../utils/constans";
import mainApi from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function MoviesCard({ onSavedMovies, movie, token }) {
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  //const [savedMovies, setSavedMovies] = useState([]);



  const currentUser = React.useContext(CurrentUserContext);

  /**useEffect(() => {
    setStateSaveBtn()
  }, [])

  function setStateSaveBtn() {
    mainApi.getMovies(token)
      .then((data) => {
        let mov = data.find(item => item.movieId == movie.movieId);
        mov ? (
          (mov.owner === currentUser._id) ? (
            setIsSavedMovie(true)
          ) : (
            setIsSavedMovie(false)
          )
        ) : (
          setIsSavedMovie(false)
        )
      })
  }**/

  function handleClick(e) {
    e.preventDefault();
    const movieForSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: apiSettings.moviesUrl + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: apiSettings.moviesUrl + movie.image.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    mainApi.getMovies(token)
      .then((data) => {
        
        let mov = data.find(item => item.nameRU == movie.nameRU);
        mov ? (
          (mov.owner === currentUser._id) ? (
            mainApi.deleteMovie(mov._id, token)
              .then(() => {
                console.log(data);
                setIsSavedMovie(isSavedMovie => !isSavedMovie);
              }).catch((err) => {
                console.log(`Ошибка: ${err}`);
              })
          ) : (
            mainApi.saveMovie(movieForSave, token)
              .then(() => {
                console.log(data);
                setIsSavedMovie(isSavedMovie => !isSavedMovie);
              }).catch((err) => {
                console.log(`Ошибка: ${err}`);
              })
          )
        ) : (
          mainApi.saveMovie(movieForSave, token)
            .then(() => {
              console.log(data);
              setIsSavedMovie(isSavedMovie => !isSavedMovie);
            }).catch((err) => {
              console.log(`Ошибка: ${err}`);
            })
        )
        
        console.log(mov);
      })
      
  }


  const btnStyle = (onSavedMovies ? "saved-movies" : (isSavedMovie ? "is-saved" : ""));

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