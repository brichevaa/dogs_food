import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';
import './header.css';
import { Icons } from './Icons/Icons';

export const Header = () => {
   return (
      <div className="header">
         <div className="container">
            <div className="header__wrapper">
               <div className="header__item">
                  <div className="header__logo">
                     <Logo />
                  </div>
                  <Search />

                  <div className="header__right">
                     <Icons />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
