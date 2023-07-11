import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({ savedCardList, onCardDelete }) {
  const [isLoading, setIsLoading] = useState(false);

  function exampleTimeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = { data: savedCardList, status: 200 };
        resolve(response);
      }, 1000);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    exampleTimeout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        {isLoading ? (<Preloader />) : (<MoviesCardList cardList={savedCardList} onCardDelete={onCardDelete} />)}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
