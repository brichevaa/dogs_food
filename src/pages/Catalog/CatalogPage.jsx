import { useContext } from 'react';
import './index.css';
import { CardList } from '../../components/CardList/CardList';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import { NotFound } from '../NotFound/NotFound';
import { useSelector } from 'react-redux';
import { SortedGoods } from '../../components/SortedGoods/SortedGoods';
import { Pagination, PaginationMain } from '../../components/Pagination/Pagination';

export const CatalogPage = () => {
   const { searchRequest } = useContext(UserContext);
   const { data: products } = useSelector((state) => state.products);

   return (
      <>
         {!searchRequest && <SortedGoods />}
         {searchRequest && (
            <div className="catalog-page">
               <p className="catalog-page__p">
                  По запросу <b>{searchRequest}</b> найдено {products.length}
                  {getIssues(products.length)}
               </p>
            </div>
         )}
         {!products.length && <NotFound />}

         <CardList cards={products} />
         <PaginationMain />
      </>
   );
};
