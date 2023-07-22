import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({ cardList, savedCardList, onSubmit, isLoading, onCardSave, onCardDelete }) {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm onSubmit={onSubmit} isLoading={isLoading} />
        {isLoading ? (<Preloader />) : (<MoviesCardList cardList={cardList} savedCardList={savedCardList} onCardSave={onCardSave} onCardDelete={onCardDelete} />)}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
