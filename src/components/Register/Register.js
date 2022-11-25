import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Form from '../Form/Form';

function Register({onSubmit}) {
  return (
    <section className="register">
      <Link to="/" >
        <img className="header__logo" src={logo} alt="Лого"></img>
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>

      <Form 
        buttonSubmitText = "Зарегестрироваться"
        state = "register"
        onSubmit={onSubmit}
      />
      
      <p className="login__footer">
        Уже зарегестрированы?&nbsp;
        <Link to="/signin" className="login__footer login__footer_link">Войти</Link>
      </p>
    </section>
  );
}
  
export default Register;