import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ShortsSwitch from "../ShortsSwitch/ShortsSwitch";
import { useFormAndValidation } from '../../../hooks/useFormAndValidation.js'

function SearchForm({ onSubmit }) {
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation()
  const [isShortsChecked, setIsShortsChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies')
      setIsShortsChecked(JSON.parse(localStorage.getItem('isShorts')))
      setValues({
        search: localStorage.getItem('searchValue')
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values.search, isShortsChecked)
    }
  }

  const handleShortsCheck = () => {
    localStorage.setItem('isShorts', !isShortsChecked);
    setIsShortsChecked(!isShortsChecked);
    onSubmit(values.search, !isShortsChecked)
  };

  return (
    <section>
      <form className="form-search" onSubmit={handleSubmit} noValidate>
        <label className="form-search__wrapper">
          <input value={values.search || ''} type="text" placeholder="Фильм" name="search" className="form-search__input" onChange={handleChange} required />
          <span className="form-search__error">{errors.search ? "Нужно ввести ключевое слово" : ""}</span>
          <button
            type="submit"
            className={`form-search__submit ${!isValid && "form-search__submit_disabled"}`}
            disabled={!isValid}>
            Найти
          </button>
        </label>
        <ShortsSwitch checkHandler={handleShortsCheck} isChecked={isShortsChecked}
        />
      </form>
    </section>
  );
}

export default SearchForm;
