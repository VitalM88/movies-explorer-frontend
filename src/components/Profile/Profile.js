import './Profile.css';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import mainApi from "../../utils/MainApi";

import validator from 'validator';

function Profile({
  signOut,
  updateUser,
  isLoggedIn,
  token
}) {

  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({name: currentUser.name, email: currentUser.email});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  useEffect(
    () => {
      setValues({name: currentUser.name, email: currentUser.email});
    },
    [currentUser],
  );
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!validator.isEmail(value)) {
        target.setCustomValidity("Введите корректную почту");
      } else {
        target.setCustomValidity('');
      }
    }

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  useEffect(() => {
    if ((currentUser.email != values.email) || (currentUser.name != values.name)) {
      isValid ? setIsActiveBtn(true) : setIsActiveBtn(false)
    } else {
      setIsActiveBtn(false);
    }
  }, [values, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    
    mainApi.editUserInfo({name: values.name, email: values.email}, token)
      .then(() => {
        //setValues({name: values.name, email: values.email});
        updateUser();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <section className="profile">
      <Header 
        state="header_nav" 
        isLoggedIn={isLoggedIn}
      />
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <form 
        className="profile__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="profile__container">
          <span className="profile__tag">Имя</span>
          <input 
            className="profile__info"
            name="name"
            value={ values.name || "" }
            minLength="2"
            maxLength="40"
            pattern="^[a-zA-Zа-яА-ЯЁё\s\-]+$"
            onChange={handleChange}
            required
          />
        </div>
        <span className="profile__input-error">{errors.name}</span>
        <div className="profile__container">
          <span className="profile__tag">E-mail</span>
          <input 
            type="email"
            className="profile__info"
            name="email"
            value={ values.email || "" }
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            required
          />
        </div>
        <span className="profile__input-error">{errors.email}</span>
        <button 
          className="profile__button" 
          type="submit"
          disabled={!isActiveBtn}
        >
          Редактировать
        </button>
      </form>
      <button 
        className="profile__footer-btn" 
        type="button"
        onClick={signOut}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}
  
export default Profile;