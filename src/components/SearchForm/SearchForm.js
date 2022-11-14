import './SearchForm.css';
import { useState } from 'react';

function SearchForm({ getSearchMovies, toogleCheckboxState }) {
  
  const [errorState, setErrorState] = useState("");
  const [searchInputValue, setSearchInputValue] = useState(JSON.parse(localStorage.getItem("searchInputValue")) || "");
  
  let checkboxState = JSON.parse(localStorage.getItem("checkboxState"));

  function handleChangeInput(e) {
    setSearchInputValue(e.target.value);
    !e.target.value ? (
      setErrorState("active")
    ) : (
      setErrorState("")
    )
  }

  function handleGetMovies(e) {
    e.preventDefault();
    if (searchInputValue) {
      getSearchMovies(searchInputValue);
      localStorage.setItem("searchInputValue", JSON.stringify(searchInputValue));
    } else {
      setErrorState("active")
    }
  } 
  
  function handleToogleCheckboxState() {
    (checkboxState = !checkboxState);
    localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
    toogleCheckboxState();
  }
  

  return (
    <form 
      className="search-form" 
      onSubmit={handleGetMovies}
      noValidate
    >
      <div className="search-form__container">
        <div className="search-form__input-container">
          <div className="search-form__input-item">
            <input 
              className="search-form__input" 
              placeholder="Фильм" 
              onChange={handleChangeInput}
              value={searchInputValue || ''}
              required 
            />
            <span className={`search-form__input-error search-form__input-error_${errorState}`}>
              Нужно ввести ключевое слово
            </span>
          </div>
          <button className="search-form__button" type="submit"></button>
        </div>
        
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input 
              className="search-form__checkbox" 
              type="checkbox" 
              onChange={handleToogleCheckboxState}
              checked={checkboxState}
            />
            <span className="search__slider" />
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </div>
    </form>
  );
}
  
export default SearchForm;