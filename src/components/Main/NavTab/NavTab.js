function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__button"><a href="#about" className="navtab__link">О проекте</a></li>
        <li className="navtab__button"><a href="#techs" className="navtab__link">Технологии</a></li>
        <li className="navtab__button"><a href="#student" className="navtab__link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
