import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <div className="search-form__input-container">
          <input className="search-form__input" placeholder="Фильм" />
          <button className="search-form__button">Найти</button>
        </div>
        <div className="search-form__checkbox-container">
          <input className="search-form__checkbox" type="checkbox" />
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </div>
    </form>
  );
}
  
export default SearchForm;