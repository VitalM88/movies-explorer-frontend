import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ state }) {
    return (
      <div className="navigation">
        {
          state === "header_main" ? (
            <div>
              <Link to="/signup" className="navigation__link">Регистрация</Link>
              <Link to="/signin" className="navigation__link">
                <button className="navigation__button">Войти</button>
              </Link>
            </div>
          ) : ''
        }
        {
          state === "header_nav" ? (
            <div>
              navigation
            </div>
          ) : ''
        }
      </div>
    );
  };
  
  export default Navigation;