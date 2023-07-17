import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useFormAndValidation } from '../../hooks/useFormAndValidation.js'
import { AppContext } from '../../contexts/AppContext.js';

function Profile() {
  const { values, handleChange } = useFormAndValidation()
  const context = useContext(AppContext);

  return (
    <>
      <Header />
      <main className="main">
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form id="profile__form" className="profile__form">
            <label className="profile__field">
              <span className="profile__span">Имя</span>
              <input value={values.name || 'Виталий'} onChange={handleChange} type="text" name="name" id="profile-input-name" className="profile__input" placeholder="Имя" minLength={2} maxLength={30} required={true} />
            </label>
            <label className="profile__field">
              <span className="profile__span">E-mail</span>
              <input value={values.email || 'pochta@yandex.ru'} onChange={handleChange} type="email" name="email" id="profile-input-email" className="profile__input" placeholder="Почта" required={true} />
            </label>
          </form>
          <div className="profile__links">
            <Link to="/profile" className="profile__link profile__link_type_edit">Редактировать</Link>
            <Link to="/signin" className="profile__link profile__link_type_exit">Выйти из аккаунта</Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
