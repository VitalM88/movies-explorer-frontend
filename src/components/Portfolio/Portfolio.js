import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__tittle">Портфолио</h3>

      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/VitalM88/how-to-learn">
            Статичный сайт <span className="span">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/VitalM88/russian-travel">
            Адаптивный сайт <span className="span">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://mesto.vitalm.nomoredomains.icu">
            Одностраничное приложение <span className="span">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
  
export default Portfolio;