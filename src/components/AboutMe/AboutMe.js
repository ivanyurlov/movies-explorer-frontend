import React from 'react';

import './AboutMe.css';
import aboutMePath from '../../images/my-photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe(props) {

  return (
    <section className="about-me" id="about-me">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__content">
          <div className="about-me__info">
            <h3 className="about-me__title">Иван</h3>
            <h4 className="about-me__subtitle">Фронтенд-разработчик, 49 лет</h4>
            <p className="about-me__text">Я родился в Нижегородской области, закончил автомобильный факультет НГТУ. У меня есть жена и трое детей. Я люблю слушать музыку, а ещё увлекаюсь спортом. Заинтересовался веб-разработкой и поступил на курс "Яндекс Практикум".</p>
          </div>
          <a href="https://github.com/ivanyurlov" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" alt="Фото автора" src={aboutMePath} />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;