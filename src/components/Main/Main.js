import "./Main.css";
import Header from "../Header/Header";
import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import Student from "./Student/Student";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <Student />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
