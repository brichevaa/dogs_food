import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import './search.css';
import closeSrc from './close.svg';
import searchSrc from './search_icon.svg';

export const Search = () => {
   const { searchRequest, setSearchRequest } = useContext(UserContext);
   return (
      <div className="search__main">
         <img src={searchSrc} alt="" className="search__search" />
         <input
            value={searchRequest}
            type="text"
            className="search__input"
            onChange={(e) => setSearchRequest(e.target.value)}
            placeholder="Поиск по сайту..."
         />
         {searchRequest && (
            <img src={closeSrc} className="search__close" onClick={() => setSearchRequest('')} />
         )}
      </div>
   );
};
