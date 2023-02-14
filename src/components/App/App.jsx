import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { CardList } from '../CardList/CardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import data from '../../data/data.json';
// import { api, getProductList, getUserInfo } from '../../utils/api';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [parentCounter, setParentCounter] = useState(0);
  // const [currentUser, setCurrentUser] = useState({});
  // const handleSearch = (search) => {
  // api.searchProducts(search).then((data) => setCards([...data]));
  useEffect(() => {
    //     if (!searchQuery) return setCards(cards);
    const newState = data.filter((e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCards(newState);
    // handleSearch(searchQuery);
  }, [searchQuery]);
  // };

  // useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getProductList()]).then(
  //     ([userData, productData]) => {
  //       setCurrentUser(userData);
  //       setCards(productData.products);
  //     }
  //   );

  // getProductList().then((data) => setCards(data.products));
  // api.getUserInfo().then((data) => setCurrentUser(data));
  // api.getProductList().then((data) => setCards(data.products));
  // }, []);

  const getIssues = (number) => {
    if (number === 1) return ' товар';
    if (number > 1 && number < 5) return ' товара';
    if (number > 4 || !number) return ' товаров';
  };
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
      <CardList cards={cards} />
      <Footer />
    </>
  );
}

export default App;
