import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import useWindowSize from '../../../hooks/useWindowSize.js';

function MoviesCardList({ cardList, onCardDelete }) {
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [counter, setCounter] = useState(12);
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
    }
  }, []);

  useEffect(() => {  //выставляем количество отображаемых фильмов при низком разрешении
    if (size.width <= 768) {
      setVisibleCount(8);
      setCounter(8);
    }
  }, [size.width]);


  return (
    <section className="cards">
      <ul className="cards__list">
        {visibleCards.map((card) => (
          <MoviesCard key={card.movieId} card={card} movieId={card.movieId} duration={card.duration} image={card.image} name={card.nameRU} onCardDelete={onCardDelete} />
        ))}
      </ul>
      {buttonVisibility && (
        <div className="cards__block-more">
          <button className="cards__button-more" onClick={handleClickMore}>Ещё</button>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
