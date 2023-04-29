import React, { useRef } from 'react';
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
import { Basket, Cart } from '../Basket/Basket';
import { Chart } from '../Chart/Chart';

function App() {
   const [cards, setCards] = useState([]);
   const [searchRequest, setSearchRequest] = useState(undefined);
   const [modal, setModal] = useState(false);
   const [isAuth, setIsAuth] = useState(false);
   const [basketItems, setBusketItems] = useState(JSON.parse(localStorage.getItem('basket')) || []);
   const isMounted = useRef(false);

   const dispatch = useDispatch(); // dispatch - передает данные
   const actualUser = useSelector((state) => state.user.data); //  useSelector - достает измененные данные
   const { favorites } = useSelector((state) => state.products);
   // const singleProduct = useSelector((state) => state.product.data);

   const onAddToBusket = (product) => {
      const itemsProduct = {
         id: product._id,
         name: product.name,
         price: product.price,
         pictures: product.pictures,
         priceTotal: product.price,
         count: 1,
      };
      basketItems.some((e) => e.id === itemsProduct.id)
         ? itemsProduct.count++
         : setBusketItems((prev) => [...prev, itemsProduct]);
   };

   const basketPlusProduct = (id) => {
      // console.log(id);
      setBusketItems((item) => {
         return item.map((element) => {
            // console.log(element);
            if (element.id === id) {
               return {
                  ...element,
                  count: element.count + 1,
                  priceTotal: (element.count + 1) * element.price,
               };
            }
            return element;
         });
      });
   };

   const basketMinusProduct = (id) => {
      setBusketItems((item) => {
         return item.map((element) => {
            if (element.id === id) {
               const newCount = element.count - 1 > 1 ? element.count - 1 : 1;
               return {
                  ...element,
                  count: newCount,
                  priceTotal: newCount * element.price,
               };
            }
            return element;
         });
      });
   };

   const onRemoveFromBusket = (id) => {
      setBusketItems(basketItems.filter((item) => item.id !== id));
   };

   const handleSearch = (search) => {
      dispatch(fetchSearchProducts(search));
   };

   const debounceValue = useDebounce(searchRequest, 500);

   useEffect(() => {
      if (debounceValue === undefined) return;
      handleSearch(debounceValue);
   }, [debounceValue]);

   useEffect(() => {
      if (!isAuth) return;
      dispatch(fetchUser()).then(() => dispatch(fetchProducts()));
   }, [dispatch, isAuth]);

   useEffect(() => {
      if (isMounted.current) {
         const json = JSON.stringify(basketItems);
         localStorage.setItem('basket', json);
      }
      isMounted.current = true;
   }, [basketItems]);

   const contextUserValue = {
      actualUser,
      searchRequest,
      setSearchRequest,
      isAuth,
   };
   const contextCardValue = {
      cards: cards,
      setCards,
      favorites,
      onAddToBusket,
      basketItems,
      setBusketItems,
      onRemoveFromBusket,
      modal,
      setModal,
      basketPlusProduct,
      basketMinusProduct,
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
         <UserContext.Provider value={contextUserValue}>
            <CardContext.Provider value={contextCardValue}>
               <Header />
               {isAuth ? (
                  <main className="content container">
                     <Routes>
                        <Route path="/" element={<MainPage />}></Route>
                        <Route path="/chart" element={<Chart />}></Route>
                        <Route path="/catalog" element={<CatalogPage />}></Route>
                        <Route path="/product/:id" element={<ProductPage />}></Route>
                        <Route path="/faq" element={<FaqPage />}></Route>
                        <Route path="/favorites" element={<Favorites />}></Route>
                        <Route path="/cart" element={<Basket />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/edit-account" element={<EditAccount />}></Route>
                        <Route path="*" element={<NotFound />}></Route>

                        {authRoutes}
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
