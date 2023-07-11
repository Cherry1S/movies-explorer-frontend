import React, { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from '../../contexts/AppContext.js';
import { cardList, savedCardList } from "../../utils/constants";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

function App() {
  const [cards, setCards] = useState(cardList);
  const [savedCards, setSavedCards] = useState(savedCardList);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleCardDelete(card) {
    setSavedCards((state) => state.filter((c) => c.movieId !== card.movieId));
  }

  return (
    <AppContext.Provider value={{ isLoggedIn }}>
      <div className="page">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movies" element={<Movies cardList={cards} />} />
            <Route path="/saved-movies" element={<SavedMovies savedCardList={savedCards} onCardDelete={handleCardDelete} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider >
  );
}

export default App;
