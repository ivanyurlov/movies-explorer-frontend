import React from 'react';

import './Techs.css';


function Techs(props) {

  return (
    <section className="techs" id="techs">
      <h2 className="section-title">Технологии</h2>
      <div className="techs__content">
        <h3 className="techs__brief">7 технологий</h3>
        <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="cards">
        <li className="cards__item">HTML</li>
        <li className="cards__item">CSS</li>
        <li className="cards__item">JS</li>
        <li className="cards__item">React</li>
        <li className="cards__item">Git</li>
        <li className="cards__item">Express.js</li>
        <li className="cards__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;