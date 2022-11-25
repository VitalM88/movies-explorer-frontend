import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <Link to="/" className="not-found__link">Назад</Link>
    </section>
  )
}

export default NotFoundPage;