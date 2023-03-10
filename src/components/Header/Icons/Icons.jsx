import logoDog from './dog.svg';
import logoFavorite from './favorites.svg';
import logoPath from './path.svg';
import './icons.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../../context/cardContext';

export const Icons = ({ count }) => {
   const { favorites } = useContext(CardContext);

   return (
      <>
         <Link to={'/favorites'} className="header__bubble-link">
            <img src={logoFavorite} alt="лого лайк" className="logo__icons" />
            {favorites.length !== 0 && (
               <span className="header__bubble">{favorites.length}</span>
            )}
         </Link>
         <Link to={'/cart'} className="header__bubble-link">
            <img src={logoPath} alt="лого корзина" className="logo__icons" />
            {count !== 0 && <span className="header__bubble">{count}</span>}
         </Link>
         <a href="/">
            <img src={logoDog} alt="лого собака" className="logo__icons" />
         </a>
      </>
   );
};
