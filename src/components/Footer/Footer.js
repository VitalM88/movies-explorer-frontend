import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__tittle">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022</p>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a className="footer__nav-link" href="https://practicum.yandex.ru/web/">Яндекс.Практикум</a>
            </li>
            <li className="footer__nav-item">
              <a className="footer__nav-link" href="https://github.com/VitalM88/">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
  
export default Footer;