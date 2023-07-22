import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
import { AppContext } from '../../contexts/AppContext.js';
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import MoviesApi from '../../utils/MoviesApi.js';
import * as mainApi from '../../utils/MainApi.js'
import { filterSearch } from '../../utils/utils.js'
import Main from "../Main/Main";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import NotFound from "../NotFound/NotFound";
import { ERRORS } from '../../utils/constants.js';


function App() {
  const [filteredCards, setFilteredCards] = useState([]);
  const [filteredSavedCards, setFilteredSavedCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState('');
  const [isOk, setIsOk] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      mainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  useEffect(() => {
    setFilteredCards([])
    Promise.all([
      mainApi.getUser(),
      mainApi.getSavedMovies()
    ])
      .then((pageData) => {
        setCurrentUser(pageData[0]);
        setSavedCards(pageData[1]);
        if (localStorage.getItem('filteredCards')) {
          setFilteredCards(JSON.parse(localStorage.getItem('filteredCards')))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [isLoggedIn]);


  function handleLoginSubmit(email, password) {
    setIsLoading(true)
    mainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setTooltipTitle('Что-то пошло не так');
        setIsOk(false);
        setIsOpen(true);
        console.log(err)
        if (err === ERRORS.UNAUTHORIZED) {
          setTooltipTitle('Неверные почта или пароль');
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleRegisterSubmit(email, password, name) {
    setIsLoading(true)
    mainApi.register(email, password, name)
      .then(() => {
        handleLoginSubmit(email, password);
      })
      .catch((err) => {
        setTooltipTitle('Что-то пошло не так');
        setIsOk(false);
        setIsOpen(true);
        console.log(err)
        if (err === ERRORS.CONFLICT) {
          setTooltipTitle('Пользователь с такой почтой уже существует');
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser(newName, newEmail) {
    setIsLoading(true)
    mainApi.changeUserInfo(newName, newEmail)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        setTooltipTitle('Данные успешно изменены');
        setIsOk(true);
        setIsOpen(true);
      })
      .catch((err) => {
        setTooltipTitle('Что-то пошло не так');
        setIsOk(false);
        setIsOpen(true);
        console.log(err);
        if (err === ERRORS.CONFLICT) {
          setTooltipTitle('Пользователь с такой почтой уже существует');
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('filteredCards');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('isShorts');
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleSearchSubmit(searchValue, isShorts) {
    setIsLoading(true)
    MoviesApi.getInitialCards()
      .then((cards) => {
        filterSearch(cards, searchValue, isShorts, setFilteredCards, { filteredCards: 'filteredCards' })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleSavedSearchSubmit(searchValue = '', isShorts) {
    setIsLoading(true)
    mainApi.getSavedMovies()
      .then((cards) => {
        filterSearch(cards, searchValue, isShorts, setFilteredSavedCards)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleSaveCard(card) {
    mainApi.saveMovie(card)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards]);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    const deletedCard = savedCards.find((c) => c.movieId === card.id || c.movieId === card.movieId);
    mainApi.deleteMovie(deletedCard);
    setSavedCards((state) => state.filter((c) => c.movieId !== card.id && c.movieId !== card.movieId));
  }

  function handlePopupClose() {
    setIsOpen(false)
  }


  return (
    <AppContext.Provider value={{ isLoggedIn, currentUser }}>
      <div className="page">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={!isLoggedIn ? <Register onSubmit={handleRegisterSubmit} isLoading={isLoading} /> : <Navigate to="/movies" replace />} />
            <Route path="/signin" element={!isLoggedIn ? <Login onSubmit={handleLoginSubmit} isLoading={isLoading} /> : <Navigate to="/movies" replace />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile}
              isLoading={isLoading}
              onLogout={handleLogout}
              onSubmit={handleUpdateUser} />}
            />
            <Route path="/movies" element={<ProtectedRoute element={Movies}
              savedCardList={savedCards}
              cardList={filteredCards}
              isLoading={isLoading}
              onCardSave={handleSaveCard}
              onCardDelete={handleCardDelete}
              onSubmit={handleSearchSubmit} />}
            />
            <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies}
              savedCardList={savedCards}
              cardList={filteredSavedCards}
              isLoading={isLoading}
              onCardSave={handleSaveCard}
              onSubmit={handleSavedSearchSubmit}
              onCardDelete={handleCardDelete} />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <InfoToolTip
            isOpen={isOpen}
            onClose={handlePopupClose}
            isOk={isOk}
            tooltipTitle={tooltipTitle}
          />
        </div>
      </div>
    </AppContext.Provider >
  );
}

export default App;
