import { Logo } from '../Header/Logo/Logo';
import './footer.css';

export const Footer = () => {
   return (
      <div className="footer">
         <div className="container">
            <div className="footer__wrapper">
               <Logo />
               <div className="footer__c">© «Интернет-магазин DogFood.ru»</div>
            </div>
         </div>
      </div>
   );
};
