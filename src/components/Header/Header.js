import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation'

function Header({ state }) {
    return (
      <header className={`header ${state}`}>
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="Лого"></img>
        </Link>
      {((state === "header_main")||(state === "header_nav")) ? <Navigation state={state} /> : ''}
      </header>
    );
  };
  
  export default Header;