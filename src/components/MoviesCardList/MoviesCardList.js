import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesForRender, onSavedMovies, moreMovies, moreButtonHidden }) {

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
          onClick={moreMovies}  
        >Еще</button>
      }
    </>
  );
}
  
export default MoviesCardList;