import React from 'react';

import './Footer.css';


function Footer(props) {

  return (
    <footer className="footer">
      <p className="footer__education">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li>
            <a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a href="https://github.com/yandex" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;