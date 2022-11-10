import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesForRender, onSavedMovies, getMoreMovies, moreButtonHidden }) {

  return (
    <>
      <ul className="cards">
       
        {moviesForRender.map((movie) => {
          return (
            <MoviesCard 
              key={movie.id}
              onSavedMovies={onSavedMovies}
              movie={movie}
            />
          )
        })}
      </ul>
      {!moreButtonHidden &&
        <button 
          type="button" 
          className="cards__button"
          onClick={getMoreMovies}  
        >Еще</button>
      }
    </>
  );
}
  
export default MoviesCardList;