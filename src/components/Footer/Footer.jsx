import { Logo } from '../Header/Logo/Logo';
import './footer.css';
import logoTelegram from './telegram.svg';
import logoWhatsapp from './whatsapp.svg';
import logoPhone from './phone.svg';
import logoInstagram from './instagram.svg';
import logoVK from './vk.svg';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import { ReactComponent as Flora } from '../Header/Logo/flora.svg';

export const Footer = () => {
   const user = useContext(UserContext);

   return (
      <div className="footer">
         <div className="container">
            <div className="footer__contact contact-hero">
               <div className="contact-hero__item-one">
                  {/* <Logo /> */}
                  <Link to={'/'} className="flora">
                     <Flora />
                  </Link>
                  <div className="footer__c">© «Интернет-магазин flora-shop.ru»</div>
               </div>
               <div className="contact-hero__item">
                  <div className="footer__title">
                     <div className="footer__title-text">
                        <Link to="/catalog">Каталог</Link>
                     </div>
                     <div className="footer__title-text">
                        <a href="/">Акции</a>
                     </div>
                     <div className="footer__title-text">
                        <a href="/">Новости</a>
                     </div>
                     <div>
                        <a href="/">Отзывы</a>
                     </div>
                  </div>
               </div>
               <div className="contact-hero__item">
                  <div className="footer__title">
                     <div className="footer__title-text">
                        <a href="/">Оплата и доставка</a>
                     </div>
                     <div className="footer__title-text">
                        <Link to={'/faq'}>Часто спрашивают</Link>
                     </div>
                     <div className="footer__title-text">
                        <a href="/">Обратная связь</a>
                     </div>
                     <div>
                        <a href="/">Контакты</a>
                     </div>
                  </div>
               </div>
               <div className="contact-hero__item contact-hero__item-last">
                  <h3>
                     <b>Мы на связи</b>
                  </h3>
                  <h3>
                     <b>8 (999) 00-00-00</b>
                  </h3>
                  <p>flora-shop@gmail.com</p>
                  <div className="contact-hero__icons ">
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
