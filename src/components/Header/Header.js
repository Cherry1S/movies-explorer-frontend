import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo_header from "../../images/header_logo.svg";
import Navigation from "../Navigation/Navigation";
import { AppContext } from '../../contexts/AppContext.js';

function Header() {
  const context = useContext(AppContext);

  return (
    <header className='header'>
      <Link to="/"><img src={logo_header} alt="логотип" className="header__logo" /></Link>
      {context.isLoggedIn ? (<Navigation />) : (
        <ul className="header__entrance">
          <li><Link to="/signup" className="header__signup">Регистрация</Link></li>
          <li><Link to="/signin" className="header__signin">Войти</Link></li>
        </ul>
      )}
    </header>
  );
}

export default Header;
