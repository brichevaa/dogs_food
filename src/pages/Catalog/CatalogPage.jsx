import { useContext } from 'react';
import { CardList } from '../../components/CardList/CardList';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import { NotFound } from '../NotFound/NotFound';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { sortedProducts } from '../../storageToolkit/products/productsSlice';

export const CatalogPage = () => {
   const { searchQuery } = useContext(UserContext);
   const { data: products } = useSelector((state) => state.products);

   const dispatch = useDispatch();

   const sortItems = [
      { id: 'Новинки' },
      { id: 'Популярные' },
      { id: 'Сначала дешёвые' },
      { id: 'Сначала дорогие' },
      { id: 'По рейтингу' },
      { id: 'По скидке' },
   ];

   const handleSortProducts = (sort) => {
      dispatch(sortedProducts(sort));
   };

   return (
      <>
         <div className="catalog-page">
            {searchQuery && (
               <p className="catalog-page__p">
                  По запросу <b>{searchQuery}</b> найдено {products?.length}
                  {getIssues(products?.length)}
               </p>
            )}
         </div>
         {!products.length && <NotFound />}
         <div className="sort-cards">
            {sortItems.map((e) => (
               <span key={e.id} className="sort-item" onClick={() => handleSortProducts(e.id)}>
                  {e.id}
               </span>
            ))}
         </div>
         <CardList cards={products} />
      </>
   );
};
