import './SavedMovies.css';
import { useState, useEffect } from 'react';
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

import mainApi from '../../utils/MainApi';

function SavedMovies({ token, isLoggedIn }) {

  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(true);
  const [notFound , setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError , setIsError] = useState(false);
  const [checkboxState , setCheckboxState] = useState(false);
  
  let counterOnSaved = (JSON.parse(localStorage.getItem("counterOnSaved")) || 1);
  let foundSavedMovies = (JSON.parse(localStorage.getItem("savedMovies")) || []);

  let savedMovies = (JSON.parse(localStorage.getItem("savedMovies")) || []);

  useEffect(() => {
    localStorage.setItem("counterOnSaved", JSON.stringify(1));
    counterOnSaved = JSON.parse(localStorage.getItem("counterOnSaved"));
    renderMovies(checkboxState);
  }, []);

  async function getSearchMovies(searchInputValue) {
    
    savedMovies = (JSON.parse(localStorage.getItem("savedMovies")));
    foundSavedMovies = [];
    localStorage.setItem("counterOnSaved", JSON.stringify(1));
    renderMovies(checkboxState);
    try {
      setIsLoading(true);
      setIsError(false);
      await mainApi.getMovies(token)
        .then((data) => {
          localStorage.setItem("savedMovies", JSON.stringify(data));
        }).catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } catch(err) {
      setIsLoading(false);
      setIsError(true);
      console.log(`Ошибка: ${err}`);
    } finally {
      if (searchInputValue) {
        setIsLoading(false);
        foundSavedMovies = (savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())));
        localStorage.setItem("counterOnSaved", JSON.stringify(1));
        renderMovies(checkboxState);
      } else {
        setIsLoading(false);
        foundSavedMovies = (JSON.parse(localStorage.getItem("savedMovies")));
        renderMovies(checkboxState);
      }
  
    }
  }

  function toogleCheckboxState(newCheckboxState) {
    renderMovies(newCheckboxState);
  }

  function getMoreMovies () {
    counterOnSaved = (JSON.parse(localStorage.getItem("counterOnSaved")) || 1);
    counterOnSaved = counterOnSaved+1;
    localStorage.setItem("counterOnSaved", JSON.stringify(counterOnSaved));
    renderMovies(checkboxState);
  }

  function getQuantityMovies () {
    counterOnSaved = (JSON.parse(localStorage.getItem("counterOnSaved")) || 1);
    let quantityMovies;
    (window.innerWidth > 800) ? (
      quantityMovies = quantityMoviesL*counterOnSaved
    ) : (
      (window.innerWidth > 414) ? (
        quantityMovies = quantityMoviesM*counterOnSaved
      ) : (quantityMovies = quantityMoviesS*counterOnSaved));
    return(quantityMovies);
  }

  function renderMovies(newCheckboxState) {
    let filteredMovies;
    (newCheckboxState) ? (
      filteredMovies = (foundSavedMovies.filter(movie => movie.duration<shortMovieDuration).slice(0,getQuantityMovies()))
    ) : (
      filteredMovies = (foundSavedMovies.slice(0,getQuantityMovies()))
    );
    (newCheckboxState) ? (
      ((filteredMovies.length === foundSavedMovies.filter(movie => movie.duration<shortMovieDuration).length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    ) : (
      (filteredMovies.length === foundSavedMovies.length) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    );
    (filteredMovies.length === 0) ? setNotFound(true) : setNotFound(false);
    setCheckboxState(newCheckboxState);
    setMoviesForRender(filteredMovies);
  }

  return (
    <section className="saved-movies">
      <Header 
        state="header_nav" 
        isLoggedIn={isLoggedIn}
      />
      <SearchForm 
        getSearchMovies={getSearchMovies}
        toogleCheckboxState={toogleCheckboxState}
        onMovies={false}
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
        onSavedMovies={true}
        moviesForRender={moviesForRender}
        getMoreMovies={getMoreMovies}
        moreButtonHidden={moreButtonHidden}
        token={token}
      />
      <Footer />
    </section>
  );
}
  
export default SavedMovies;