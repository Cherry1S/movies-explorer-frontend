import photo from "../../../images/photo.jpg";

function Student() {
  return (
    <section id="student" className="student">
      <h2 className="student__header">Студент</h2>
      <div className="student__info">
        <div className="student__bio">
          <h3 className="student__name">Игорь</h3>
          <p className="student__short">Фронтенд-разработчик, 26 лет</p>
          <p className="student__description">
            Я родился в Норильске, закончил техникум промышленных технологий. В детстве увлекался компьютерными играми,
            создавал свои серверы, настраивал их и немного копался в коде игр и серверов, редактировал и переписывал плагины. После армии работал по
            профессии, занимался обработкой различных металлов в компании "Норильский Никель". Недавно переехал и решил выбрать другую профессию.
          </p>
          <a href="https://github.com/Cherry1S" className="student__github" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img className="student__photo" src={photo} alt="Фотография студента"
        />
      </div>
    </section>
  );
}

export default Student;
