import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <section className="movies">
      <Header state="header_nav" />
      <SearchForm />

      <Footer />
    </section>
  );
}
  
export default Movies;