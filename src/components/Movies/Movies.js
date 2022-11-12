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

function Movies({token}) {

  //const [movies, setMovies] = useState([]);
  //const [counter, setCounter] = useState(JSON.parse(localStorage.getItem("counter")) || 1);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [checkboxStateRender, setCheckboxStateRender] = useState(JSON.parse(localStorage.getItem("checkboxState")) || false);
  const [notFound , setNotFound] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [isError , setIsError] = useState(false);
  
  let checkboxState = (JSON.parse(localStorage.getItem("checkboxState")) || false);
  let counter = (JSON.parse(localStorage.getItem("counter")) || 1);
  let searchInputValue = (JSON.parse(localStorage.getItem("searchInputValue")) || "");
  let movies;

  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        //setMovies(JSON.parse(localStorage.getItem("movies")));
        movies = (JSON.parse(localStorage.getItem("movies")));
        getSearchMovies(searchInputValue);
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  //useEffect(() => {
  //  getSearchMovies(searchInputValue);
  //}, [foundMovies]);


  //function getMoreMovies() {
  //  setCounter(counter => counter + 1);
  //}

  async function getSearchMovies(searchInputValue) {
    setIsLoading(true);
    try {
      setFoundMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase())));
      localStorage.setItem("counter", JSON.stringify(1));
      setIsError(false);
      setIsLoading(false);
    } catch {
      setIsError(true);
    }
  }

  //function toogleCheckboxState() {
  //  setcheckboxState(s => !s);
  //}

  function toogleCheckboxState() {
    checkboxState = !checkboxState;
    localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
    setCheckboxStateRender(checkboxState);
    renderMovies();
    renderNotFound();
  }

  function getMoreMovies () {
    counter = (JSON.parse(localStorage.getItem("counter")) || 1);
    counter = counter+1;
    localStorage.setItem("counter", JSON.stringify(counter));
    renderMovies();
    renderNotFound();
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
    (checkboxState) ? (
      setMoviesForRender(foundMovies.filter(movie => movie.duration<20).slice(0,getQuantityMovies()))
    ) : (
      setMoviesForRender(foundMovies.slice(0,getQuantityMovies()))
    );
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }

  function renderNotFound() {
    (moviesForRender.length === 0) ? setNotFound(true) : setNotFound(false);
  }

  function renderMoreButton() {
    (checkboxState) ? (
      ((moviesForRender.length === foundMovies.filter(movie => movie.duration<20).length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    ) : (
      ((moviesForRender.length === foundMovies.length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    );
  }


  useEffect(() => {
    renderMovies();
    renderNotFound();
  }, [foundMovies]);

  useEffect(() => {
    renderMoreButton();
    renderNotFound();
  }, [moviesForRender]);

  return (
    <section className="movies">
      <Header state="header_nav" />
      <SearchForm 
        getSearchMovies={getSearchMovies}
        checkboxStateRender={checkboxStateRender}
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
        token={token}
      />
      
      <Footer />
    </section>
  );
}
  
export default Movies;