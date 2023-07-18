import React from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({ savedCardList, onCardDelete, onCardSave, isLoading, onSubmit }) {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm onSubmit={onSubmit} />
        {isLoading ? (<Preloader />) : (<MoviesCardList cardList={savedCardList} savedCardList={savedCardList} onCardDelete={onCardDelete} onCardSave={onCardSave}/>)}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
