import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__tittle">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 34 года</p>
          <p className="about-me__description">
          Я родился и живу в Смоленске, окончил НИУ “МЭИ” по специальности “Электромеханика”.
          Я люблю слушать музыку, играть на гитаре, заниматься спортом и путешествовать. 
          В февраля 2022 года начал проходить курс “Веб-разработчик” от Яндекс Практикума.
          </p>
          <a className="about-me__link" href="https://github.com/VitalM88">Github</a>
        </div>

        <img src={avatar} alt="avatar" className="about-me__avatar" />
      </div>
    </section>
  );
}
  
export default AboutMe;