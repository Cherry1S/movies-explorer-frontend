import React, { useEffect, useState } from 'react';
import { toHoursAndMinutes } from '../../../utils/utils.js'
import { useLocation, Link } from 'react-router-dom';

function MoviesCard({ savedCardList, card, movieId, duration, image, trailerLink, name, onCardDelete, onCardSave }) {
  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation()
  const saveButtonClassName = (
    `${location.pathname === '/saved-movies'
      ? 'card__deletebutton'
      : `card__savebutton ${isSaved && 'card__savebutton_active'}`
    }`
  );

  function handleSave() {
    if (isSaved) {
      onCardDelete(card);
      setIsSaved(!isSaved);
      return
    }
    onCardSave(card)
    setIsSaved(!isSaved);
  }

  useEffect(() => {
    const isSaved = savedCardList.some((i) => i.movieId === movieId);
    setIsSaved(isSaved);
  }, [ savedCardList ]);

  return (
    <li className="card">
      <Link to={trailerLink} target="_blank"><img src={card.image.url ? `https://api.nomoreparties.co/${image}` : `${image}`} alt={name} className="card__img" /></Link>
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
