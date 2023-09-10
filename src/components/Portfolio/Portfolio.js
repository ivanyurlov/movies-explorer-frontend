import React from 'react';

import './Portfolio.css';
import arrowPath from '../../images/arrow-icon.svg';


function Portfolio(props) {

  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__links">
        <li className="portfolio__container">
          <a href="https://github.com/ivanyurlov/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Статичный сайт</p>
            <img className="portfolio__link-icon" src={arrowPath} alt="Иконка - стрелка" />
          </a>
        </li>
        <li className="portfolio__container">
          <a href="https://github.com/ivanyurlov/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img className="portfolio__link-icon" src={arrowPath} alt="Иконка - стрелка" />
          </a>
        </li>
        <li className="portfolio__container">
          <a href="https://github.com/ivanyurlov/react-mesto-api-full-gha" className="portfolio__link" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img className="portfolio__link-icon" src={arrowPath} alt="Иконка - стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;