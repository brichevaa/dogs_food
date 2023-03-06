import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../context/cardContext';
import { ReactComponent as Notfound } from '../NotFound/notfound.svg';
import './favorites.css';

export const Favorites = () => {
   const { favorites } = useContext(CardContext);
   const navigate = useNavigate();

   return (
      <div className="favorites">
         <span className="favorites__back" onClick={() => navigate(-1)}>
            {'<  '}Назад
         </span>
         <h1 className="favorites__h1">Избранное</h1>
         {!!favorites.length ? (
            <CardList cards={favorites} />
         ) : (
            <div className="not-found">
               <Notfound />
               <div className="not-found__text">
                  В Избранном пока ничего нет
               </div>
               <p className="not-found__text-gray">
                  Добавляйте товары в Избранное с помощью ❤️️
               </p>
               <button
                  className="btn btn__not-found"
                  onClick={() => navigate('/')}
               >
                  На главную
               </button>
            </div>
         )}
      </div>
   );
};
