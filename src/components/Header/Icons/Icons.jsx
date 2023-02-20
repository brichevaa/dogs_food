import logoDog from './dog.svg';
import logoFavorite from './favorites.svg';
import logoPath from './path.svg';
import './icons.css';

export const Icons = () => {
   return (
      <>
         <a href="/">
            <img src={logoFavorite} alt="лого лайк" className="logo__main" />
         </a>
         <a href="/">
            <img src={logoPath} alt="лого корзина" className="logo__main" />
         </a>
         <a href="/">
            <img src={logoDog} alt="лого собака" className="logo__main" />
         </a>
      </>
   );
};
