import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

  const movies = [];

  for (let i=0; i<16; i++) {
    movies.push(MoviesCard());
  }

  return (
    <>
      <li className="cards">
        {movies}
      </li>
      <button className="cards__button">Еще</button>
    </>
  );
}
  
export default MoviesCardList;