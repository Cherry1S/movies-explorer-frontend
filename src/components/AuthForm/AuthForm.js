import logo_header from "../../images/header_logo.svg"
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useFormAndValidation } from '../../hooks/useFormAndValidation.js'

function AuthForm({ title, buttonSubmitText, onSubmit }) {
  const { values, handleChange, errors, isValid, isEmailValid } = useFormAndValidation()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && isEmailValid) {
      onSubmit(values.email, values.password, values.name);
    }
  }

  return (
    <section className="auth">
      <Link to="/"><img src={logo_header} alt="логотип" className="auth-logo" /></Link>
      <h2 className="auth__title">{title}</h2>
      <form onSubmit={handleSubmit} className="auth__form" noValidate >
        <div>
          {location.pathname === '/signup' && (
            <>
              <label className="auth__field">Имя
                <input type="text" onChange={handleChange} className={`auth__input ${errors.name && "auth__input_error"}`} name="name" placeholder="Введите ваше имя" required />
                <span className="auth__error">{errors.name}</span>
              </label>
            </>
          )}
          <label className="auth__field">E-mail
            <input type="email" onChange={handleChange} className={`auth__input ${!isEmailValid && "auth__input_error"}`} name="email" placeholder="Введите Email" minLength={2} maxLength={40} required={true} />
            <span className="auth__error">{!isEmailValid ? 'Неверно указана почта.' : ''}</span>
          </label>
          <label className="auth__field">Пароль
            <input type="password" onChange={handleChange} className={`auth__input ${errors.password && "auth__input_error"}`} name="password" placeholder="Введите Пароль" minLength={2} maxLength={40} required={true} />
            <span className="auth__error">{errors.password}</span>
          </label>
        </div>
        <button
          className={`auth__submit ${(!isValid || !isEmailValid) && "auth__submit_disabled"}`}
          disabled={!isValid || !isEmailValid}
          type="submit">
          {buttonSubmitText}
        </button>
      </form>
    </section>
  );
}

export default AuthForm;
