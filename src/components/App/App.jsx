import React from 'react';
import { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { useDebounce } from '../../utils/utils';

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
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../storageToolkit/user/userSlice';
import { fetchProducts, fetchSearchProducts } from '../../storageToolkit/products/productsSlice';

function App() {
   const [cards, setCards] = useState([]);
   const [searchQuery, setSearchQuery] = useState(undefined);
   const [basketCounter, setBasketCounter] = useState(0);
   const [modal, setModal] = useState(false);
   const [isAuth, setIsAuth] = useState(false);

   const dispatch = useDispatch(); // dispatch - передает данные
   const currentUser = useSelector((state) => state.user.data); //  useSelector - достает измененные данные
   const { data: products, favorites } = useSelector((state) => state.products);

   const handleSearch = (search) => {
      dispatch(fetchSearchProducts(search));
      // api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
   };

   const debounceValueInApp = useDebounce(searchQuery, 500);

   useEffect(() => {
      if (debounceValueInApp === undefined) return;
      handleSearch(debounceValueInApp);
   }, [debounceValueInApp]);

   useEffect(() => {
      if (!isAuth) return;
      dispatch(fetchUser()).then(() => dispatch(fetchProducts()));
   }, [dispatch, isAuth]);

   useEffect(() => {
      setCards(products);
   }, [products, favorites]);

   const contextValue = {
      currentUser,
      searchQuery,
      setSearchQuery,
      basketCounter,
      setBasketCounter,
      isAuth,
   };
   const contextCardValue = {
      cards: cards,
      setCards,
      favorites,
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
               <Header setModal={setModal} modal={modal} />
               {isAuth ? (
                  <main className="content container">
                     <Routes></Routes>
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
