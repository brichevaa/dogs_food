import { useContext } from 'react';
import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import { NotFound } from '../NotFound/NotFound';
import './index.css';

export const CatalogPage = () => {
   const { cards } = useContext(CardContext);
   const { searchQuery, setSort } = useContext(UserContext);

   const sortItems = [{ id: 'Новинки' }, { id: 'Популярные' }, { id: 'Сначала дешёвые' }, { id: 'Сначала дорогие' }, { id: 'По рейтингу' }, { id: 'По скидке' }];

   return (
      <>
         {searchQuery && (
            <p>
               По запросу <b>{searchQuery}</b> найдено {cards?.length}
               {getIssues(cards.length)}
            </p>
         )}
         {/* {!cards.length && <NotFound />} */}
         <div className="sort-cards">
            {sortItems.map((e) => (
               <span key={e.id} className="sort-item" onClick={() => setSort(e.id)}>
                  {e.id}
               </span>
            ))}
         </div>
         <CardList cards={cards} />
      </>
   );
};
