import './Movies.css';
import React, { useState } from 'react';
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
//import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies({ token }) {

  //const currentUser = React.useContext(CurrentUserContext);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(true);
  const [notFound , setNotFound] = useState(false);
  const [isError , setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  let counter = (JSON.parse(localStorage.getItem("counter")) || 1);
  let foundMovies = (JSON.parse(localStorage.getItem("foundMovies")) || []);
  let movies;
  //let savedMovies = (JSON.parse(localStorage.getItem("savedMovies")) || []);
  //let userSavedMovies = (JSON.parse(localStorage.getItem("userSavedMovies")) || []);
  let checkboxState = (JSON.parse(localStorage.getItem("checkboxState")) || "false");

  /**useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        movies = (JSON.parse(localStorage.getItem("movies")));
        renderMovies();
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка: ${err}`);
      });
    mainApi.getMovies(token)
      .then((data) => {
        localStorage.setItem("savedMovies", JSON.stringify(data));
      }).catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);**/

  
  
  //function getUserSavedMovies() {
  //  userSavedMovies = savedMovies.filter(item => item.owner === currentUser._id);
  //  localStorage.setItem("userSavedMovies", JSON.stringify(userSavedMovies));
  //}

  async function getSearchMovies(searchInputValue) {
    movies = (JSON.parse(localStorage.getItem("movies")));
    foundMovies = [];
    localStorage.setItem("foundMovies", JSON.stringify([]));
    localStorage.setItem("counter", JSON.stringify(1));
    renderMovies();
    try {
      setIsError(false);
      setIsLoading(true);
      await moviesApi.getMovies()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
          movies = (JSON.parse(localStorage.getItem("movies")));
          renderMovies();
        })
        .catch((err) => {
          
          console.log(`Ошибка: ${err}`);
        });
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
        renderMovies();
        setIsLoading(false);
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
      filteredMovies = (foundMovies.filter(movie => movie.duration<20).slice(0,getQuantityMovies()))
    ) : (
      filteredMovies = (foundMovies.slice(0,getQuantityMovies()))
    );
    (checkboxState) ? (
      ((filteredMovies.length === foundMovies.filter(movie => movie.duration<20).length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    ) : (
      (filteredMovies.length === foundMovies.length) ? setMoreButtonHidden(true) : setMoreButtonHidden(false)
    );
    (filteredMovies.length === 0) ? setNotFound(true) : setNotFound(false);
    
    setMoviesForRender(filteredMovies);
  }

  return (
    <section className="movies">
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