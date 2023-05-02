import { useSelector } from 'react-redux';
import './pagination.css';

export const Pagination = ({ productPerPage, totalProducts, paginate }) => {
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
      pageNumbers.push(i);
   }
   const currentPage = useSelector((st) => st.products.currentPage);

   return (
      <div className="pagination">
         {/* <button className="pagination__array">{'<<'}</button> */}
         <ul className="pagination__ul">
            {pageNumbers.map((num) => (
               <li className="page-item" key={num}>
                  <span
                     className={`page-link ${
                        currentPage ? 'page-item__active' : 'page-item__active-none'
                     }`}
                     onClick={() => paginate(num)}
                  >
                     {num}
                  </span>
               </li>
            ))}
         </ul>
         {/* <button className="pagination__array" onClick={() => nextPage()}>
            {'>>'}
         </button> */}
      </div>
   );
};
