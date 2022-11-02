import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header state="header_nav" />
      <SearchForm />

      <Footer />
    </section>
  );
}
  
export default SavedMovies;