import { useState } from "react";
import ShortsSwitch from "../ShortsSwitch/ShortsSwitch";

function SearchForm() {
  const [searchValue, setSearchValue] = useState("");
  const [isShortsChecked, setIsShortsChecked] = useState(false);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
  };

  return (
    <section>
      <form className="form-search">
        <label className="form-search__wrapper">
          <input type="text" placeholder="Фильм" className="form-search__input" onChange={handleChange} value={searchValue} minLength="2" required />
          <button className="form-search__submit-btn">Найти</button>
        </label>
        <ShortsSwitch checkHandler={handleShortsCheck} isChecked={isShortsChecked}
        />
      </form>
    </section>
  );
}

export default SearchForm;
