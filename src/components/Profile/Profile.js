import { useContext, useEffect } from "react";
import Header from "../Header/Header";
import { useFormAndValidation } from '../../hooks/useFormAndValidation.js'
import { AppContext } from '../../contexts/AppContext.js';

function Profile({ onLogout, onSubmit, isLoading }) {
  const { values, handleChange, errors, isValid, isEmailValid, setValues, resetForm } = useFormAndValidation()
  const context = useContext(AppContext);

  useEffect(() => {
    resetForm();
    setValues({
      name: context.currentUser.name,
      email: context.currentUser.email
    });
  }, [context.currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && isEmailValid) {
      onSubmit(values.name, values.email)
    }
  }

  return (
    <>
      <Header />
      <main className="main">
        <section className="profile">
          <h1 className="profile__title">Привет, {context.currentUser.name}!</h1>
          <form onSubmit={handleSubmit} className="profile__form" noValidate>
            <label className="profile__field">
              <span className="profile__span">Имя</span>
              <input
                value={values.name || ``}
                onChange={handleChange}
                type="text"
                name="name"
                id="profile-input-name"
                className="profile__input"
                placeholder="Имя"
                minLength={2}
                maxLength={30}
                disabled={isLoading}
                required={true} />
              <span className="profile__error">{errors.name}</span>
            </label>
            <label className="profile__field">
              <span className="profile__span">E-mail</span>
              <input
                value={values.email || ``}
                onChange={handleChange}
                type="email"
                name="email"
                id="profile-input-email"
                className="profile__input"
                placeholder="Почта"
                disabled={isLoading}
                required={true} />
              <span className="profile__error">{!isEmailValid ? 'Неверно указана почта.' : ''}</span>
            </label>
            <div className="profile__links">
              <button
                type="submit"
                className={`profile__link profile__link_type_edit ${(!isValid || !isEmailValid || (values.name === context.currentUser.name && values.email === context.currentUser.email) || isLoading) && "profile__link_disabled"}`}
                disabled={!isValid || !isEmailValid || (values.name === context.currentUser.name && values.email === context.currentUser.email) || isLoading}>
                Редактировать
              </button>
              <button type="button" onMouseDown={onLogout} className="profile__link profile__link_type_exit">Выйти из аккаунта</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
