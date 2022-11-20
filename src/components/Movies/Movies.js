import './Movies.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoTip from '../InfoTip/InfoTip';
import {
  quantityMoviesL,
  quantityMoviesM,
  quantityMoviesS,
  shortMovieDuration,
} from '../../utils/constans.js'
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies({ token, isLoggedIn }) {

  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(true);
  const [notFound , setNotFound] = useState(false);
  const [isError , setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxState , setCheckboxState] = useState(JSON.parse(localStorage.getItem("checkboxState")) || false);
  
  let counter = (JSON.parse(localStorage.getItem("counter")) || 1);
  let foundMovies = (JSON.parse(localStorage.getItem("foundMovies")) || []);
  let movies = (JSON.parse(localStorage.getItem("movies")) || []);

  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        movies = (JSON.parse(localStorage.getItem("movies")));
        renderMovies(checkboxState);
      })
      .catch((err) => {
        
        console.log(`Ошибка: ${err}`);
      });

  }, []);

  async function getSearchMovies(searchInputValue) {
    movies = (JSON.parse(localStorage.getItem("movies")));
    foundMovies = [];
    localStorage.setItem("foundMovies", JSON.stringify([]));
    localStorage.setItem("counter", JSON.stringify(1));
    renderMovies(checkboxState);
    try {
      setIsError(false);
      setIsLoading(true);
      await mainApi.getMovies(token)
        .then((data) => {
          localStorage.setItem("savedMovies", JSON.stringify(data));
        }).catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } catch(err) {
      console.log(`Ошибка: ${err}`);
      setIsError(true);
      setIsLoading(false);
    } finally {
      if (searchInputValue) {
        
        foundMovies = (movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())));
        localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
        localStorage.setItem("counter", JSON.stringify(1));
        renderMovies(checkboxState);
        setIsLoading(false);
      }
      
    }
  }

  function toogleCheckboxState(newCheckboxState) {
    renderMovies(newCheckboxState);
  }

  function getMoreMovies () {
    counter = (JSON.parse(localStorage.getItem("counter")) || 1);
    counter = counter+1;
    localStorage.setItem("counter", JSON.stringify(counter));
    renderMovies(checkboxState);
  }

  function getQuantityMovies () {
    let quantityMovies;
    (window.innerWidth > 800) ? (
      quantityMovies = quantityMoviesL*counter
    ) : (
      (window.innerWidth > 414) ? (
        quantityMovies = quantityMoviesM*counter
      ) : (quantityMovies = quantityMoviesS*counter));
    return(quantityMovies);
  }

  function renderMovies(newCheckboxState) {
    let filteredMovies;
    (newCheckboxState) ? (
      filteredMovies = (foundMovies.filter(movie => movie.duration<shortMovieDuration).slice(0,getQuantityMovies()))
    ) : (
      filteredMovies = (foundMovies.slice(0,getQuantityMovies()))
    );
    (newCheckboxState) ? (
      ((filteredMovies.length === foundMovies.filter(movie => movie.duration<shortMovieDuration).length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    ) : (
      (filteredMovies.length === foundMovies.length) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    );
    (filteredMovies.length === 0) ? setNotFound(true) : setNotFound(false);
    console.log(checkboxState, newCheckboxState);
    setCheckboxState(newCheckboxState);
    setMoviesForRender(filteredMovies);
  }

  return (
    <section className="movies">
      <Header 
        state="header_nav" 
        isLoggedIn={isLoggedIn}
      />
      <SearchForm 
        getSearchMovies={getSearchMovies}
        toogleCheckboxState={toogleCheckboxState}
        onMovies={true}
        checkboxState={checkboxState}
      />
      {
        <InfoTip 
          notFound={notFound}
          isLoading={isLoading}
          isError={isError}
        />
      }
      <MoviesCardList 
        onSavedMovies={false}
        moviesForRender={moviesForRender}
        getMoreMovies={getMoreMovies}
        moreButtonHidden={moreButtonHidden}
        token={token}

      />
      
      <Footer />
    </section>
  );
}
  
export default Movies;