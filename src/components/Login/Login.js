import './Login.css';
import { Link } from 'react-router-dom';
import Form from '../Form/Form'
import logo from '../../images/logo.svg';

function Login({onSubmit}) {



  return (
    <section className="login">
      <Link to="/" >
        <img className="header__logo" src={logo} alt="Лого"></img>
      </Link>
      <h2 className='login__title'>Рады видеть!</h2>
      
      <Form 
        buttonSubmitText = "Войти"
        state = "login"
        onSubmit={onSubmit}
      />

      <p className="login__footer">
        Ещё не зарегистрированы?&nbsp;
        <Link to="/signup" className="login__footer login__footer_link">Регистрация</Link>
      </p>
    </section>
  );
}
  
export default Login;