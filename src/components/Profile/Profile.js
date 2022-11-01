import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <section className="profile">
      <Header state="header_nav" />
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__container">
          <span className="profile__tag">Имя</span>
          <span className="profile__info">Виталий</span>
        </div>
        <div className="profile__container">
          <span className="profile__tag">E-mail</span>
          <span className="profile__info">pochta@yandex.ru</span>
        </div>
        <button className="profile__button" type="button">Редактировать</button>
      </form>
      <button className="profile__footer-btn" type="button">Выйти из аккаунта</button>
    </section>
  );
}
  
export default Profile;