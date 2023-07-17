import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({ cardList }) {
  const [isLoading, setIsLoading] = useState(false);

  function exampleTimeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = { data: cardList, status: 200, };
        resolve(response);
      }, 1000);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    exampleTimeout()
      .then((res) => { console.log(res); })
      .catch((err) => { console.error(err); })
      .finally(() => { setIsLoading(false); });
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        {isLoading ? (<Preloader />) : (<MoviesCardList cardList={cardList} />)}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
