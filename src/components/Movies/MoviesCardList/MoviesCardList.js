import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import useWindowSize from '../../../hooks/useWindowSize.js';
import { MOVIES_CARDS } from "../../../utils/constants.js";

function MoviesCardList({ cardList, savedCardList, onCardDelete, onCardSave }) {
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [visibleCount, setVisibleCount] = useState(MOVIES_CARDS.DEFAULT_COUNT);
  const [counter, setCounter] = useState(MOVIES_CARDS.DEFAULT_COUNTER);
  const size = useWindowSize(); //хук проверки размера окна

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
    if (size.width <= MOVIES_CARDS.WIDTH1) {
      setVisibleCount(MOVIES_CARDS.WIDTH1_COUNT);
      setCounter(MOVIES_CARDS.WIDTH1_COUNTER);
    }
    if (size.width <= MOVIES_CARDS.WIDTH2) {
      setVisibleCount(MOVIES_CARDS.WIDTH2_COUNT);
      setCounter(MOVIES_CARDS.WIDTH2_COUNTER);
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
      {cardList.length === 0 && localStorage.getItem('filteredCards') && (
        <h2 className="cards__notfound">Ничего не найдено</h2>
      )}
    </section>
  );
}

export default MoviesCardList;
