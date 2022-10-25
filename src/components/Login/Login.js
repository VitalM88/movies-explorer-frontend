import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="login">
      <Link to="/" >
        <img className="header__logo" src={logo} alt="Лого"></img>
      </Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form className="login__form">
      
      </form>
    </section>
  );
}
  
export default Login;