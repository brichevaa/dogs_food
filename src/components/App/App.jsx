import React from 'react';
import { useEffect, useState } from 'react';
import { CardList } from '../CardList/CardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
// import data from '../../data/data.json';
import { api, getProductList, getUserInfo } from '../../utils/api';
import { getIssues, useDebounce } from '../../utils/utils';

function App() {
   const [cards, setCards] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [currentUser, setCurrentUser] = useState({});

   const handleSearch = (search) => {
      api.searchProducts(search).then((data) => setCards(() => [...data]));
   };

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

   const Search = {
      fontWeight: '800',
   };

   return (
      <>
         <Header setSearchQuery={setSearchQuery} />

         <main className="content container">
            {searchQuery && (
               <p>
                  По запросу <span style={Search}>{searchQuery}</span> найдено{' '}
                  {cards.length}
                  {getIssues(cards.length)}
               </p>
            )}
         </main>
         <CardList
            currentUser={currentUser}
            cards={cards}
            handleProductLike={handleProductLike}
         />
         <Footer />
      </>
   );
}

export default App;
