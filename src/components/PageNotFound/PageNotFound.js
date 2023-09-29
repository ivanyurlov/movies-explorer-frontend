import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './PageNotFound.css';


function PageNotFound(props) {
  const path = useNavigate();

  function returnPath() {
    path(-2);
  }

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <Link to="#" className="not-found__link" onClick={returnPath}>Назад</Link>
    </section>
  );
}

export default PageNotFound;