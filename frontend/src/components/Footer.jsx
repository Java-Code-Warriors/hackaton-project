import React from 'react';
import '../css/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="contact-info">
        <p>Оставайтесь на связи</p>
        <p>8-800-77-07-999</p>
        <p>с 10:00 до 05:00</p>
      </div>
      <div className="store-info">
        <p>Адрес магазина в Владивостоке</p>
      </div>
      <div className="newsletter">
        <p>Следите за новостями и акциями:</p>
        <input type="email" placeholder="Введите email" />
        <button>Отправить</button>
      </div>
    </footer>
  );
};

export default Footer;