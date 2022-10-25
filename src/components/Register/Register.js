import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className="register">
      <Link to="/" >
        <img className="header__logo" src={logo} alt="Лого"></img>
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className="register__form">
      
      </form>
    </section>
  );
}
  
export default Register;