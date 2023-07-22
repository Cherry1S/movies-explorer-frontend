import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard.js";
import useWindowSize from '../../../hooks/useWindowSize.js';

function MoviesCardList({ cardList, savedCardList, onCardDelete, onCardSave }) {
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [visibleCount, setVisibleCount] = useState(16);
  const [counter, setCounter] = useState(4);
  const size = useWindowSize(); //хук проверки размера окна
  const location = useLocation();

  const visibleCards = cardList.slice(0, visibleCount);

  const handleClickMore = () => {  //обработка клика "Еще"
    if (visibleCount <= cardList.length) {
      setVisibleCount(visibleCount + counter);
    }
    if (visibleCount + counter >= cardList.length) {
      setButtonVisibility(false);
    }
  };

  useEffect(() => {
    if (cardList.length <= visibleCount) { //проверяем, нужно ли показывать кнопку "Еще"
      setButtonVisibility(false);
    } else {
      setButtonVisibility(true);
    }
  }, [cardList]);

  useEffect(() => {  //выставляем количество отображаемых фильмов при низком разрешении
    if (size.width <= 1000) {
      setVisibleCount(8);
      setCounter(2);
    }
    if (size.width <= 630) {
      setVisibleCount(5);
      setCounter(2);
    }
  }, [size.width]);


  return (
    <section className="cards">
      <ul className="cards__list">
        {visibleCards.map((card) => (
          <MoviesCard
            key={card.id || card._id}
            card={card}
            savedCardList={savedCardList}
            movieId={card.id || card.movieId}
            duration={card.duration}
            image={card.image.url || card.image}
            trailerLink={card.trailerLink}
            name={card.nameRU}
            onCardDelete={onCardDelete}
            onCardSave={onCardSave} />
        ))}
      </ul>
      {buttonVisibility && (
        <div className="cards__block-more">
          <button className="cards__button-more" onClick={handleClickMore}>Ещё</button>
        </div>
      )}
      {cardList.length === 0 && location.pathname === '/movies' && localStorage.getItem('filteredCards') && (
        <h2 className="cards__notfound">Ничего не найдено</h2>
      )}
    </section>
  );
}

export default MoviesCardList;
