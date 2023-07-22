import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ShortsSwitch from "../ShortsSwitch/ShortsSwitch";
import { useFormAndValidation } from '../../../hooks/useFormAndValidation.js'

function SearchForm({ onSubmit }) {
  const { values, handleChange, errors, isValid, setIsValid, setValues } = useFormAndValidation()
  const [isShortsChecked, setIsShortsChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      setIsShortsChecked(JSON.parse(localStorage.getItem('isShorts')))
      setValues({
        search: localStorage.getItem('searchValue')
      });
      if (localStorage.getItem('searchValue')) {
        setIsValid(true)
      }
    }
    if (location.pathname === '/saved-movies') {
      onSubmit(values.search, isShortsChecked)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/movies') {
      localStorage.setItem('searchValue', values.search);
    }
    if (isValid) {
      onSubmit(values.search, isShortsChecked)
    }
  }

  const handleShortsCheck = () => {
    if (location.pathname === '/movies') {
      localStorage.setItem('isShorts', !isShortsChecked);
    }
    setIsShortsChecked(!isShortsChecked);
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
