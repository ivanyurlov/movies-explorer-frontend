import React from 'react';

import './AboutProject.css';

function AboutProject(props) {

  return (
    <section className="about-project" id="about-project">
      <h2 className="section-title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__cell">
          <h3 className="about-project__brief">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__cell">
          <h3 className="about-project__brief">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__duration">
        <div className="about-project__duration-item about-project__duration-item_backend">1 неделя</div>
        <div className="about-project__duration-item about-project__duration-item_frontend">4 недели</div>
      </div>
      <div className="about-project__duration about-project__duration_modify">
        <div className="about-project__duration-item">Back-end</div>
        <div className="about-project__duration-item">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;