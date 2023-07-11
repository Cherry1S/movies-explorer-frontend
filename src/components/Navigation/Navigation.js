import React, { useState } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import accountIcon from "../../images/nav_accountIcon.svg"

function Navigation() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

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
          <Link to="/profile" className="navigation__profile">Аккаунт<img src={accountIcon} alt="Account Icon" className="navigation__profile-icon" /></Link>
        </div>
    </>
  );
}

export default Navigation;
