import './SavedMovies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoTip from '../InfoTip/InfoTip';
import {
  quantityMoviesL,
  quantityMoviesM,
  quantityMoviesS,
} from '../../utils/constans.js'

import mainApi from '../../utils/MainApi';

function SavedMovies({ token }) {

  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(true);
  const [notFound , setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError , setIsError] = useState(false);
  
  let counter = (JSON.parse(localStorage.getItem("counter")) || 1);
  let foundSavedMovies = (JSON.parse(localStorage.getItem("foundSavedMovies")) || []);
  let savedMovies;
  let checkboxState = (JSON.parse(localStorage.getItem("checkboxState")) || "false");
  let searchInputValue = (JSON.parse(localStorage.getItem("searchInputValue")) || "");

  //useEffect(() => {
  //  getSearchMovies(searchInputValue);
  //}, [foundSavedMovies]);

  function deleteMovie() {
    getSearchMovies(searchInputValue);
  }

  async function getSearchMovies(searchInputValue) {
    
    savedMovies = (JSON.parse(localStorage.getItem("savedMovies")));
    foundSavedMovies = [];
    localStorage.setItem("foundSavedMovies", JSON.stringify([]));
    localStorage.setItem("counter", JSON.stringify(1));
    renderMovies();
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
        localStorage.setItem("foundSavedMovies", JSON.stringify(foundSavedMovies));
        localStorage.setItem("counter", JSON.stringify(1));
        renderMovies();
      }
    }
  }

  function toogleCheckboxState() {
    renderMovies();
  }

  function getMoreMovies () {
    counter = (JSON.parse(localStorage.getItem("counter")) || 1);
    counter = counter+1;
    localStorage.setItem("counter", JSON.stringify(counter));
    renderMovies();
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

  function renderMovies() {
    let filteredMovies;
    checkboxState = JSON.parse(localStorage.getItem("checkboxState"));
    (checkboxState) ? (
      filteredMovies = (foundSavedMovies.filter(movie => movie.duration<20).slice(0,getQuantityMovies()))
    ) : (
      filteredMovies = (foundSavedMovies.slice(0,getQuantityMovies()))
    );
    (checkboxState) ? (
      ((filteredMovies.length === foundSavedMovies.filter(movie => movie.duration<20).length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    ) : (
      (filteredMovies.length === foundSavedMovies.length) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    );
    (filteredMovies.length === 0) ? setNotFound(true) : setNotFound(false);
    
    setMoviesForRender(filteredMovies);
  }

  return (
    <section className="saved-movies">
      <Header state="header_nav" />
      <SearchForm 
        getSearchMovies={getSearchMovies}
        toogleCheckboxState={toogleCheckboxState}
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
        deleteMovie={deleteMovie}
      />
      <Footer />
    </section>
  );
}
  
export default SavedMovies;