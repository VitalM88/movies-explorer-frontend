import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation'

function Header({ state }) {
  return (
    <header className={`header ${state}`}>
      <Link to="/" >
        <img className="header__logo" src={logo} alt="Лого"></img>
      </Link>
      <Navigation state={state} />
    </header>
  );
}
  
export default Header;