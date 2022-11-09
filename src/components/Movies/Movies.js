import './Movies.css';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';

function Movies() {

  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(1);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moreButtonHidden, setMoreButtonHidden] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        console.log(movies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function countMovies() {
    let quantityMovies = 16;
    (window.innerWidth > 800) ? (quantityMovies = 16*counter) : ((window.innerWidth > 414) ? (quantityMovies = 8*counter) : (quantityMovies = 5*counter));
    setMoviesForRender(foundMovies.slice(0,quantityMovies));
  }

  useEffect(() => {
    countMovies()
  }, [counter, foundMovies]);

  useEffect(() => {
    ((moviesForRender.length === foundMovies.length)) ? setMoreButtonHidden(true) : setMoreButtonHidden(false);
  }, [moviesForRender]);

  function moreMovies() {
    setCounter(counter => counter + 1);
    console.log(movies);
  }

  function getSearchMovies(inputValue) {
    console.log(inputValue);
    setFoundMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())));
    setCounter(1);
  }
 
  return (
    <section className="movies">
      <Header state="header_nav" />
      <SearchForm 
        getSearchMovies={getSearchMovies}
      />
      <MoviesCardList 
        onSavedMovies={false}
        moviesForRender={moviesForRender}
        moreMovies={moreMovies}
        moreButtonHidden={moreButtonHidden}
      />
      
      <Footer />
    </section>
  );
}
  
export default Movies;