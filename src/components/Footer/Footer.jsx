import { Logo } from '../Header/Logo/Logo';
import './footer.css';
import logoTelegram from './telegram.svg';
import logoWhatsapp from './whatsapp.svg';
import logoPhone from './phone.svg';
import logoInstagram from './instagram.svg';
import logoVK from './vk.svg';

export const Footer = () => {
   return (
      <div className="footer">
         <div className="container">
            <div className="footer__contact contact-hero">
               <div className="contact-hero__item">
                  <Logo />
                  <div className="footer__c">
                     © «Интернет-магазин DogFood.ru»
                  </div>
               </div>
               <div className="contact-hero__item">
                  <div className="footer__title">
                     <p>Каталог</p>
                     <p>Акции</p>
                     <p>Новости</p>
                     <p>Отзывы</p>
                  </div>
               </div>
               <div className="contact-hero__item">
                  <div className="footer__title">
                     <p>Оплата и доставка</p>
                     <p>Часто спрашивают</p>
                     <p>Обратная связь</p>
                     <p>Контакты</p>
                  </div>
               </div>
               <div className="contact-hero__item">
                  <h3>Мы на связи</h3>
                  <h3>8 (999) 00-00-00</h3>
                  <p>dogfood.ru@gmail.com</p>
                  <div className="contact-hero__icons">
                     <a href="/">
                        <img src={logoTelegram} alt="logo telegram" />
                     </a>
                     <a href="/">
                        <img src={logoWhatsapp} alt="logo whatsapp" />
                     </a>
                     <a href="/">
                        <img src={logoPhone} alt="logo phone" />
                     </a>
                     <a href="/">
                        <img src={logoInstagram} alt="logo instagram" />
                     </a>
                     <a href="/">
                        <img src={logoVK} alt="logo vk" />
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
