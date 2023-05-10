import { useDispatch } from 'react-redux';
import './sorted.css';
import { sortedProducts } from '../../storageToolkit/products/productsSlice';

export const SortedGoods = () => {
   const dispatch = useDispatch();

   const handleSortProducts = (sort) => {
      dispatch(sortedProducts(sort));
   };

   const sortItems = [
      { id: 'Новинки' },
      { id: 'Популярные' },
      { id: 'Сначала дешёвые' },
      { id: 'Сначала дорогие' },
      { id: 'По рейтингу' },
   ];
   return (
      <div className="sort-cards">
         {sortItems.map((e) => (
            <span key={e.id} className="sort-item" onClick={() => handleSortProducts(e.id)}>
               {e.id}
            </span>
         ))}
      </div>
   );
};
