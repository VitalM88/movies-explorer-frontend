import './Profile.css';
import Header from '../Header/Header';
import { useState } from 'react';

function Profile({
  signOut,
  updateUser,
  userEmail,
  userName,
}) {

  const [newUserName, setNewUserName] = useState(userName);
  const [newUserEmail, setNewUserEmail] = useState(userEmail);

  function handleChangeName(e) {
    setNewUserName(e.target.value);
  }

  function handleChangeEmail(e) {
    setNewUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({name: (newUserName), email: (newUserEmail)});
  }

  return (
    <section className="profile">
      <Header state="header_nav" />
      <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
      <form 
        className="profile__form"
        onSubmit={handleSubmit}
      >
        <div className="profile__container">
          <span className="profile__tag">Имя</span>
          <input 
            className="profile__info"
            name="name"
            value={ newUserName || "" }
            placeholder={userName}
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
        </div>
        <div className="profile__container">
          <span className="profile__tag">E-mail</span>
          <input 
            type="email"
            className="profile__info"
            name="name"
            value={ newUserEmail || "" }
            placeholder={userEmail}
            minLength="2"
            maxLength="40"
            onChange={handleChangeEmail}
          />
        </div>
        <button 
          className="profile__button" 
          type="submit"
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