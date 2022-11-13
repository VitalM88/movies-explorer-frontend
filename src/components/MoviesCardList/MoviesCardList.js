import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ 
  moviesForRender, 
  onSavedMovies, 
  getMoreMovies, 
  moreButtonHidden, 
  token,

}) {

  return (
    <>
      <ul className="cards">
       
        {moviesForRender.map((movie) => {
          return (
            <MoviesCard 
              key={movie.id || movie.movieId}
              onSavedMovies={onSavedMovies}
              movie={movie}
              token={token}

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