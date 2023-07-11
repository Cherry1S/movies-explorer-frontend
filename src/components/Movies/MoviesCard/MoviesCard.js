import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { savedCardList } from "../../../utils/constants";

function MoviesCard({ card, movieId, duration, image, name, onCardDelete }) {
  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation()
  const saveButtonClassName = (
    `${location.pathname === '/saved-movies'  //если на странице сохраненных фильмов, задаем другой класс кнопки
      ? 'card__deletebutton'  //крестик
      : `card__savebutton ${isSaved && 'card__savebutton_active'}` //круг
    }`
  );

  function toHoursAndMinutes(totalSeconds) {  //переводим секунды в часы и минуты
    const totalMinutes = Math.floor(totalSeconds / 60);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}ч${minutes}м`;
  }

  function handleSave() {  //обработчик клика на кружок
    setIsSaved(!isSaved);
    console.log(onCardDelete)
    if (location.pathname === '/saved-movies') {
      onCardDelete(card);
    }
  }

  useEffect(() => {  //проверка на сохраненные фильмы в полученном массиве
    const isSaved = savedCardList.some((i) => i.movieId === movieId);
    setIsSaved(isSaved);
  }, []);

  return (
    <li className="card">
      <img src={image} alt={name} className="card__img" />
      <div className="card__container">
        <div className="card__header">
          <h2 className="card__title">{name}</h2>
          <p className="card__duration">{toHoursAndMinutes(duration)}</p>
        </div>
        <button className={saveButtonClassName} onMouseDown={handleSave}></button>
      </div>
    </li>
  );
}

export default MoviesCard;
