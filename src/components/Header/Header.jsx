import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';
import './header.css';
import { Icons } from './Icons/Icons';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { Link } from 'react-router-dom';

export const Header = () => {
   const { favorites } = useContext(CardContext);

   return (
      <div className="header">
         <div className="container">
            <div className="header__wrapper">
               <div className="header__item">
                  <div className="header__logo">
                     <Logo />
                  </div>
                  <Search />
                  <div>
                     <Link to="/favorites">{favorites.length}</Link>
                  </div>
                  <div className="header__right">
                     <Icons />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
