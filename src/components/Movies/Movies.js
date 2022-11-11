import './Movies.css';
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
} from '../../utils/constans.js'

import moviesApi from '../../utils/MoviesApi';

function Movies() {

  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem("counter")) || 1);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(false);
  const [foundMovies, setFoundMovies] = useState(JSON.parse(localStorage.getItem("foundMovies")) || []);
  const [checkboxState, setcheckboxState] = useState(JSON.parse(localStorage.getItem("checkbox")) || false);
  const [notFound , setNotFound] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [isError , setIsError] = useState(false);

 
  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        setIsLoading(true);
      })
      .then(() => {
        setIsLoading(false);
      })
      .then(() => {
        renderMovies();
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function getMoreMovies() {
    setCounter(counter => counter + 1);
  }

  function getSearchMovies(searchInputValue) {
    setFoundMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())));
    setCounter(1);
    setIsError(false);
    setIsLoading(false);
  }

  function toogleCheckboxState() {
    setcheckboxState(s => !s);
  }

  function renderMovies() {
    let quantityMovies;

    (window.innerWidth > 800) ? (
      quantityMovies = quantityMoviesL*counter
    ) : (
      (window.innerWidth > 414) ? (
        quantityMovies = quantityMoviesM*counter
      ) : (quantityMovies = quantityMoviesS*counter));

    (checkboxState) ? (
      setMoviesForRender(foundMovies.filter(movie => movie.duration<20).slice(0,quantityMovies))
    ) : (
      setMoviesForRender(foundMovies.slice(0,quantityMovies))
    );
    localStorage.setItem("counter", JSON.stringify(counter));
    localStorage.setItem("checkbox", JSON.stringify(checkboxState));
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }

  function renderNotFound() {
    (moviesForRender.length === 0) ? setNotFound(true) : setNotFound(false);
  }

  useEffect(() => {
    renderMovies();
    renderNotFound();
  }, [counter, foundMovies, checkboxState]);

  useEffect(() => {
    (checkboxState) ? (
      ((moviesForRender.length === foundMovies.filter(movie => movie.duration<20).length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    ) : (
      ((moviesForRender.length === foundMovies.length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    );
    renderNotFound();
  }, [moviesForRender]);

  return (
    <section className="movies">
      <Header state="header_nav" />
      <SearchForm 
        getSearchMovies={getSearchMovies}
        checkboxState={checkboxState}
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
        onSavedMovies={false}
        moviesForRender={moviesForRender}
        getMoreMovies={getMoreMovies}
        moreButtonHidden={moreButtonHidden}
      />
      
      <Footer />
    </section>
  );
}
  
export default Movies;