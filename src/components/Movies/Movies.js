import './Movies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';

function Movies() {

  //const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(1);
  //const [quantityMovies, setQuantity] = useState(16);
  const [moviesForRender, setMoviesForRender] = useState([]);
  //const [moreButtonHidden, setMoreButtonHidden] = useState(false);

  let movies;
 
  function getMovies() {
    moviesApi.getMovies()
      .then((data) => {
        movies = JSON.parse(JSON.stringify(data));
        console.log(movies);
        countMovies(counter, movies);
        
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    
  }

  function countMovies(counter, movies) {
    
    let quantityMovies = 16;
    (window.innerWidth > 800) ? (quantityMovies = 16*counter) : ((window.innerWidth > 414) ? (quantityMovies = 8*counter) : (quantityMovies = 5*counter));
    setMoviesForRender(movies.slice(0,quantityMovies));
    //  (moviesForRender.length >= movies.length) ? setMoreButtonHidden(true) : setMoreButtonHidden(false);
    console.log(counter);
  }

  function moreMovies() {
    setCounter(counter => counter + 1)
    //countMovies(counter, movies);
    console.log(movies);
  }

 
  return (
    <section className="movies">
      <Header state="header_nav" />
      <SearchForm 
        getMovies={getMovies}
      />
      <MoviesCardList 
        onSavedMovies={false}
        moviesForRender={moviesForRender}
        moreMovies={moreMovies}
        moreButtonHidden={false}
      />
      
      <Footer />
    </section>
  );
}
  
export default Movies;