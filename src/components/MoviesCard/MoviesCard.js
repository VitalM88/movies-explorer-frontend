import React, { useState, useEffect } from 'react';
import './MoviesCard.css';
import { apiSettings } from "../../utils/constans";
import mainApi from '../../utils/MainApi';

function MoviesCard({ onSavedMovies, movie, token }) {
  const [isSavedMovie, setIsSavedMovie] = useState('');
 
  let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  let imgUrl = onSavedMovies ? (movie.image) : (apiSettings.moviesUrl + movie.image.url);
  
  useEffect(() => {
    let mov = savedMovies.find(item => item.nameRU == movie.nameRU);
    mov ? setIsSavedMovie("is-saved") : setIsSavedMovie("")
  }, []);

  async function handleClick(e) {
    e.preventDefault();
    
    const movieForSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: imgUrl,
      trailerLink: movie.trailerLink,
      thumbnail: apiSettings.moviesUrl + movie.image.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    
    let mov = savedMovies.find(item => item.nameRU == movie.nameRU);
    try {
      mov ? (   
        await  mainApi.deleteMovie(mov._id, token)
          .then(() => {
            setIsSavedMovie("");
          }).catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      ) : (
        await  mainApi.saveMovie(movieForSave, token)
          .then(() => {
            setIsSavedMovie("is-saved");
          }).catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      )
      
    } catch(err) {
      console.log(`Ошибка: ${err}`);
    } finally {
      await mainApi.getMovies(token)
        .then((data) => {
          localStorage.setItem("savedMovies", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      
      onSavedMovies ? setIsSavedMovie("") : (null);
    } 
  }


  const btnStyle = (onSavedMovies ? "saved-movies" : isSavedMovie);

  return (
    (!onSavedMovies || (isSavedMovie == "is-saved")) &&
    <li className="movie">
      <a className="movie__image-container" href={movie.trailerLink} target="_blank">
        <img 
          className="movie__image" 
          src={`${imgUrl}`} 
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