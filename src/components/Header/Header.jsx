import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';
import './header.css';
import { Icons } from './Icons/Icons';
import { ReactComponent as Flora } from './Logo/flora.svg';
import { Link } from 'react-router-dom';

export const Header = () => {
   return (
      <div className="header">
         <div className="container">
            <div className="header__wrapper">
               <div className="header__item">
                  {/* <div className="header__logo">
                     <Logo />
                  </div> */}
                  <Link to={'/'}>
                     <Flora className="flora" />
                  </Link>

                  <Search />
                  <div className="header__items">
                     <Link to={'/'}>Главная</Link>
                     <Link to={'/catalog'}>Каталог</Link>
                     <Link to={'/chart'}>График</Link>
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
