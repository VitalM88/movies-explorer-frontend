import './Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useFormWithValidation } from '../../utils/validation.js'

function Form({buttonSubmitText, state, onSubmit}) {

  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    (state == "register") ? navigate("/signin") : navigate("/movies")
    isValid ? onSubmit({name: values.name, email: values.email, password: values.password}) : (null)
  }

  return (
    <form 
      className="form" 
      onSubmit={handleSubmit}
      noValidate
    >
      { state === "register" ? (
        <label className={"form__field"}>
          <h3 className="form_text">Имя</h3>
          <input
            name="name"
            value={ values.name || "" }
            onChange={handleChange}
            className="form__input form__input_type_name"
            minLength="2"
            maxLength="40"
            pattern="^[a-zA-Zа-яА-ЯЁё\s\-]+$"
            required />
          <span className="form__input-error">{errors.name}</span>
        </label>
      ) : ''
      }
      <label className="form__field">
        <h3 className="form_text">E-mail</h3>
        <input
          type="email"
          name="email"
          value={ values.email || "" }
          onChange={handleChange}
          className="form__input form__input_type_email"
          minLength="2"
          maxLength="40"
          required />
        <span className="form__input-error">{errors.email}</span>
      </label>

      <label className="form__field">
        <h3 className="form_text">Пароль</h3>
        <input
          type="password"
          name="password"
          value={ values.password || "" }
          onChange={handleChange}
          className="form__input form__input_type_password"
          minLength="8"
          maxLength="40"
          required />
        <span className="form__input-error">{errors.password}</span>
      </label>

      <button
        type="submit"
        className="form__submit"
        disabled={!isValid}
      >
        { buttonSubmitText }
      </button>
    </form>
  );
}
  
export default Form;