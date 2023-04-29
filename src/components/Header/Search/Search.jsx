import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import './search.css';

export const Search = () => {
   const { setSearchRequest } = useContext(UserContext);
   return (
      <input
         type="text"
         className="search__input"
         onChange={(e) => setSearchRequest(e.target.value)}
         placeholder="Поиск по сайту"
      />
   );
};
