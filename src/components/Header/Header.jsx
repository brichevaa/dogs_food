import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';
import './header.css';
import { Icons } from './Icons/Icons';

export const Header = ({ setSearchQuery }) => {
   return (
      <div className="header">
         <div className="container">
            <div className="header__wrapper">
               <div className="header__left">
                  <Logo />
                  <Search setSearchQuery={setSearchQuery} />
               </div>
               <div className="header__right">
                  <Icons />
               </div>
            </div>
         </div>
      </div>
   );
};
