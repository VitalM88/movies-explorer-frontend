import './Profile.css';
import Header from '../Header/Header';
import { useState } from 'react';

function Profile({
  signOut,
  updateUser,
  userEmail,
  userName,
}) {

  const [values, setValues] = useState({name: userName, email: userEmail});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({name: values.name, email: values.email});
  }

  return (
    <section className="profile">
      <Header state="header_nav" />
      <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
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
            placeholder={userName}
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
            placeholder={userEmail}
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
          disabled={!isValid}
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