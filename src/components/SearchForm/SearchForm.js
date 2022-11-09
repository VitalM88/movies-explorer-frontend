import './SearchForm.css';
import { useState } from 'react';

function SearchForm({ getMovies }) {
  
  //  const [isValid, setIsValid] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [inputValue, setInputValue] = useState("");

  function handleChangeInput(e) {
    setInputValue(e.target.value);
    !e.target.value ? (
    //    setIsValid(false),
      setErrorState("active")
    ) : (
    //     setIsValid(true),
      setErrorState("")
    )
  }

  function handleGetMovies(e) {
    e.preventDefault();
    getMovies(inputValue);
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
              value={inputValue || ''}
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
            <input className="search-form__checkbox" type="checkbox" />
            <span className="search__slider" />
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </div>
    </form>
  );
}
  
export default SearchForm;