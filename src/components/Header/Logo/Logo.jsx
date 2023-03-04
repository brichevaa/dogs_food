import logoSrc from './logo.svg';
import './logo.css';

export const Logo = () => {
   return (
      <a href="/">
         <img src={logoSrc} alt="логотип компании" />
      </a>
   );
};
