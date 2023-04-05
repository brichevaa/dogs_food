import React from 'react';
import { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { findLike, useDebounce } from '../../utils/utils';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { CatalogPage } from '../../pages/Catalog/CatalogPage';
import { ProductPage } from '../../pages/Product/ProductPage';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FaqPage } from '../../pages/FAQ/FaqPage';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Favorites } from '../../pages/Favorites/Favorites';

import { Modal } from '../Modal/Modal';
import { Login } from '../Auth/Login/Login';
import { Register } from '../Auth/Register/Register';
import { MainPage } from '../../pages/Main/MainPage';
import { RemovePassword } from '../Auth/RemovePassword/RemovePassword';
import { parseJwt } from '../../utils/parseJWT';
import { Profile } from '../Profile/Profile';
import { EditAccount } from '../EditAccount/EditAccount';

function App() {
   const [cards, setCards] = useState([]);
   const [searchQuery, setSearchQuery] = useState(undefined);
   const [currentUser, setCurrentUser] = useState({});
   const [favorites, setFavorites] = useState([]);
   const [basketCounter, setBasketCounter] = useState(0);
   const [modal, setModal] = useState(false);
   const [isAuth, setIsAuth] = useState(false);

   const filteredCards = (products, id) => {
      return products;
      // return products.filter((e) => e.author._id === id);
   };

   const handleSearch = (search) => {
      api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
   };

   // console.log({ currentUser });

   const debounceValueInApp = useDebounce(searchQuery, 500);

   function handleProductLike(product) {
      // понимаем , отлайкан ли продукт
      const isLiked = findLike(product, currentUser);
      isLiked
         ? // Если товар был с лайком, значит было действие по удалению лайка
           api.deleteLike(product._id).then((newCard) => {
              // newCard - карточка с уже изменненым количеством лайков
              const newCards = cards.map((e) => (e._id === newCard._id ? newCard : e));
              setCards(filteredCards(newCards, currentUser._id));
              setFavorites((state) => state.filter((f) => f._id !== newCard._id));
           })
         : // Если не отлайкан, значит действие было совершено для добавления лайка.
           api.addLike(product._id).then((newCard) => {
              const newCards = cards.map((e) => (e._id === newCard._id ? newCard : e));
              setCards(filteredCards(newCards, currentUser._id));
              setFavorites((favor) => [...favor, newCard]);
           });
   }

   useEffect(() => {
      if (debounceValueInApp === undefined) return;
      handleSearch(debounceValueInApp);
   }, [debounceValueInApp]);

   // Первоначальная загрузка карточек/продуктов/постов/сущностей и данных юзера
   useEffect(() => {
      Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, productData]) => {
         // сеттим юзера
         setCurrentUser(userData);
         const items = filteredCards(productData.products, userData._id);
         // сеттим карточки
         setCards(items);

         // получаем отлайканные нами карточки
         const fav = items.filter((e) => findLike(e, userData));
         // сеттим карточки в избранный стейт
         setFavorites(fav);
      });
   }, [isAuth]);

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
         const newCards = cards.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
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
      setCurrentUser,
      searchQuery,
      setSearchQuery,
      basketCounter,
      setBasketCounter,
      isAuth,
   };
   const contextCardValue = {
      cards: cards,
      handleProductLike,
      favorites,
      setFavorites,
      setBasketCounter,
   };
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      // const authPath = ['/reset-password', '/register']

      const uncodedToken = parseJwt(token);
      if (uncodedToken?._id) {
         setIsAuth(true);
      }
      // else if (!authPath.includes(location.pathname)) {
      //   navigate('/login');
      //}
   }, [navigate]);

   const authRoutes = (
      <>
         <Route
            path="login"
            element={
               <Modal modal={modal} setModal={setModal}>
                  <Login setModal={setModal} />
               </Modal>
            }
         ></Route>
         <Route
            path="register"
            element={
               <Modal modal={modal} setModal={setModal}>
                  <Register setModal={setModal} />
               </Modal>
            }
         ></Route>
         <Route
            path="remove-password"
            element={
               <Modal modal={modal} setModal={setModal}>
                  <RemovePassword setModal={setModal} />
               </Modal>
            }
         ></Route>
      </>
   );

   return (
      <>
         <UserContext.Provider value={contextValue}>
            <CardContext.Provider value={contextCardValue}>
               <Header setModal={setModal} />
               {isAuth ? (
                  <main className="content container">
                     <Routes>
                        <Route path="/" element={<MainPage />}></Route>
                        <Route path="/catalog" element={<CatalogPage />}></Route>
                        <Route path="/product/:productId" element={<ProductPage />}></Route>
                        <Route path="faq" element={<FaqPage />}></Route>
                        <Route path="/favorites" element={<Favorites />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/edit-account" element={<EditAccount />}></Route>

                        {authRoutes}

                        <Route path="*" element={<NotFound />}></Route>
                     </Routes>
                  </main>
               ) : (
                  <div className="not-auth">
                     Пожалуйста, авторизуйтесь.
                     <Routes>{authRoutes}</Routes>
                  </div>
               )}

               <Footer />
            </CardContext.Provider>
         </UserContext.Provider>
      </>
   );
}

export default App;
