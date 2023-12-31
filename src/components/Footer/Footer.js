function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__bottom">
        <p className="footer__coryright">© {year}</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href="https://github.com/Cherry1s" target="_blank" rel="noopener noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
