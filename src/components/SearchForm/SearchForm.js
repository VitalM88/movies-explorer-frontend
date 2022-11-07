/* eslint-disable jsx-a11y/label-has-associated-control */
import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <div className="search-form__input-container">
          <input className="search-form__input" placeholder="Фильм" />
          <button className="search-form__button"></button>
        </div>
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input className="search-form__checkbox" type="checkbox" required="true" />
            <span className="search__slider" />
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </div>
    </form>
  );
}
  
export default SearchForm;