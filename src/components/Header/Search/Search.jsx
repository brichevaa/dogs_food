import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import './search.css';

export const Search = () => {
   const { setSearchQuery } = useContext(UserContext);
   return (
      <input
         type="text"
         className="search__input"
         onChange={(e) => setSearchQuery(e.target.value)}
         placeholder="Поиск по сайту"
      />
   );
};
