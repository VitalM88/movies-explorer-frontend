import './Form.css';
import { useState } from 'react';

function Form({buttonSubmitText, state, onSubmit}) {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setUserPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({name: userName, email: userEmail, password: userPassword});
  }

  return (
    <form 
      className="form" 
      onSubmit={handleSubmit}
    >
      { state === "register" ? (
        <label className={"form__field"}>
          <h3 className="form_text">Имя</h3>
          <input
            name="name"
            value={ userName || "" }
            onChange={handleChangeName}
            className="form__input form__input_type_name"
            minLength="2"
            maxLength="40"
            required />
          <span className="form__input-error"></span>
        </label>
      ) : ''
      }
      <label className="form__field">
        <h3 className="form_text">E-mail</h3>
        <input
          type="email"
          name="email"
          value={ userEmail || "" }
          onChange={handleChangeEmail}
          className="form__input form__input_type_email"
          minLength="2"
          maxLength="40"
          required />
        <span className="form__input-error"></span>
      </label>

      <label className="form__field">
        <h3 className="form_text">Пароль</h3>
        <input
          type="password"
          name="password"
          value={ userPassword || "" }
          onChange={handleChangePassword}
          className="form__input form__input_type_password"
          minLength="8"
          maxLength="40"
          required />
        <span className="form__input-error"></span>
      </label>

      <button
        type="submit"
        className="form__submit"
      >
        { buttonSubmitText }
      </button>
    </form>
  );
}
  
export default Form;