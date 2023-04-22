import { useContext } from 'react';
import './index.css';
import { CardList } from '../../components/CardList/CardList';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import { NotFound } from '../NotFound/NotFound';
import { useSelector } from 'react-redux';
import { SortedGoods } from '../../components/SortedGoods/SortedGoods';

export const CatalogPage = () => {
   const { searchQuery } = useContext(UserContext);
   const { data: products } = useSelector((state) => state.products);

   return (
      <>
         {!searchQuery && <SortedGoods />}
         {searchQuery && (
            <div className="catalog-page">
               <p className="catalog-page__p">
                  По запросу <b>{searchQuery}</b> найдено {products.length}
                  {getIssues(products.length)}
               </p>
            </div>
         )}
         {!products.length && <NotFound />}

         <CardList cards={products} />
      </>
   );
};
