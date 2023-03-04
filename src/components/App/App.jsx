import React from 'react';
import { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce } from '../../utils/utils';

import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../../pages/Catalog/CatalogPage';
import { ProductPage } from '../../pages/Product/ProductPage';
import { UserContext } from '../../context/userContext';
import { CardContext, Cardcontext } from '../../context/cardContext';
import { FaqPage } from '../../pages/FAQ/FaqPage';
import { NotFound } from '../../pages/NotFound/NotFound';

function App() {
   const [cards, setCards] = useState([]);
   const [searchQuery, setSearchQuery] = useState(undefined);
   const [currentUser, setCurrentUser] = useState({});

   // const filteredCards = (products, id) =>
   //    products.filter((e) => e.author._id === id);
   // console.log(cards);

   const handleSearch = (search) => {
      api.searchProducts(search).then((data) => setCards([...data]));
   };

   // console.log({ currentUser });

   const debounceValueInApp = useDebounce(searchQuery, 500);

   function handleProductLike(product) {
      const isLiked = product.likes.some((el) => el === currentUser._id);
      isLiked
         ? api.deleteLike(product._id).then((newCard) => {
              const newCards = cards.map((e) =>
                 e._id === newCard._id ? newCard : e
              );
              setCards([...newCards]);
           })
         : api.addLike(product._id).then((newCard) => {
              const newCards = cards.map((e) =>
                 e._id === newCard._id ? newCard : e
              );
              setCards([...newCards]);
           });
   }

   useEffect(() => {
      handleSearch(debounceValueInApp);
   }, [debounceValueInApp]);

   useEffect(() => {
      Promise.all([api.getUserInfo(), api.getProductList()]).then(
         ([userData, productData]) => {
            setCurrentUser(userData);
            setCards(productData.products);
         }
      );
   }, []);

   const setSortCards = (sort) => {
      console.log(sort);
      if (sort === 'Сначала дешёвые') {
         const newCards = cards.sort((a, b) => a.price - b.price);
         setCards([...newCards]);
      }
      if (sort === 'Сначала дорогие') {
         const newCards = cards.sort((a, b) => b.price - a.price);
         setCards([...newCards]);
      }
      if (sort === 'Популярные') {
         const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
         setCards([...newCards]);
      }
      if (sort === 'Новинки') {
         const newCards = cards.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
         );
         setCards([...newCards]);
      }
      if (sort === 'По скидке') {
         const newCards = cards.sort((a, b) => b.discount - a.discount);
         setCards([...newCards]);
      }
   };

   const contextValue = {
      setSort: setSortCards,
      currentUser,
      searchQuery,
      setSearchQuery,
   };
   const contextCardValue = { cards, handleProductLike };

   return (
      <>
         <UserContext.Provider value={contextValue}>
            <CardContext.Provider value={contextCardValue}>
               <Header />

               <main className="content container">
                  <Routes>
                     <Route
                        path="/"
                        element={
                           <CatalogPage handleProductLike={handleProductLike} />
                        }
                     ></Route>
                     <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                     ></Route>
                     <Route path="faq" element={<FaqPage />}></Route>
                     <Route path="*" element={<NotFound />}></Route>
                  </Routes>
               </main>
               <Footer />
            </CardContext.Provider>
         </UserContext.Provider>
      </>
   );
}

export default App;
