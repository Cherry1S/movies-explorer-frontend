import React from "react";
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <main className="main">
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button onMouseDown={goBack} className="not-found__link">Назад</button>
      </div>
    </main>
  );
};

export default NotFound;
