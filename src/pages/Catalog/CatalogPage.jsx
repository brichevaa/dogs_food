import { useContext, useEffect, useState } from 'react';
import './index.css';
import { CardList } from '../../components/CardList/CardList';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import { NotFound } from '../NotFound/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { SortedGoods } from '../../components/SortedGoods/SortedGoods';
import { Pagination } from '../../components/Pagination/Pagination';
import { setCurrentPage } from '../../storageToolkit/products/productsSlice';

export const CatalogPage = () => {
   const { searchRequest } = useContext(UserContext);
   const products = useSelector((s) => s.products.data);
   const loading = useSelector((st) => st.products.loading);

   const dispatch = useDispatch();

   const { currentPage, productPerPage } = useSelector((st) => st.products);

   const lastProductindex = currentPage * productPerPage;
   const firstProductIndex = lastProductindex - productPerPage;
   const currentProducts = products.slice(firstProductIndex, lastProductindex);

   const paginate = (pageNum) => dispatch(setCurrentPage(pageNum));

   if (products.length === 0) {
      return <NotFound />;
   }

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
         <CardList cards={currentProducts} />
         {products.length > 0 && (
            <Pagination
               productPerPage={productPerPage}
               totalProducts={products.length}
               paginate={paginate}
            />
         )}
      </>
   );
};
