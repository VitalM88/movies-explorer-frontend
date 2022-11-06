import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <section className="movies">
      <Header state="header_nav" />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
}
  
export default Movies;