import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import accountIcon from "../../images/nav_accountIcon.svg"
import { AppContext } from '../../contexts/AppContext.js';

function Navigation() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const context = useContext(AppContext);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <>
      {isBurgerMenuOpen ? (<BurgerMenu isOpen={isBurgerMenuOpen} onClick={toggleBurgerMenu} />) : (
        <button className="navigation__burger-button" type="button" onClick={toggleBurgerMenu}></button>
      )}

        <div className="navigation__container">
          <ul className="navigation__list">
            <li className="navigation__item"><Link to="/movies" className="navigation__link">Фильмы</Link></li>
            <li className="navigation__item"><Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link></li>
          </ul>
          <Link to="/profile" className="navigation__profile">{context.currentUser.name}<img src={accountIcon} alt="Account Icon" className="navigation__profile-icon" /></Link>
        </div>
    </>
  );
}

export default Navigation;
