import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ onSavedMovies }) {

  const movies = [];

  for (let i=0; i<16; i++) {
    movies.push(MoviesCard({onSavedMovies}));
  }

  return (
    <>
      <li className="cards">
        {movies}
      </li>
      <button type="button" className="cards__button">Еще</button>
    </>
  );
}
  
export default MoviesCardList;