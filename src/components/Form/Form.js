import './Form.css';

function Form({buttonSubmitText, state}) {
  return (
    <form className="form">

      <label className={`form__field form__field_state_${state}`}>
        <h3 className="form_text">Имя</h3>
        <input
          className="form__input form__input_type_name"
          minLength="2"
          maxLength="40"
          required />
        <span className="form__input-error"></span>
      </label>

      <label className="form__field">
        <h3 className="form_text">E-mail</h3>
        <input
          type="email"
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