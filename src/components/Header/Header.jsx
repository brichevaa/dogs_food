import { Logo } from './Logo/Logo';
import { Search } from './Search/Search';
import './header.css';
import { Icons } from './Icons/Icons';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';

export const Header = ({ setModal }) => {
   const { basketCounter } = useContext(UserContext);
   const [counter, setCounter] = useState(basketCounter);

   useEffect(() => {
      setCounter((st) => st + 1);

      return () => setCounter(basketCounter);
   }, [basketCounter]);

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
                     <Icons count={counter} setModal={setModal} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
