import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardList } from '../../components/CardList/CardList';
import { ReactComponent as Notfound } from '../NotFound/notfound.svg';
import './favorites.css';
import { Back } from '../../components/Back/Back';
import { useSelector } from 'react-redux';
import { UserContext } from '../../context/userContext';

export const Favorites = () => {
   const { searchRequest } = useContext(UserContext);

   const { favorites } = useSelector((state) => state.products);
   console.log(favorites);

   const navigate = useNavigate();

   if (searchRequest) {
      navigate('/catalog');
   }

   return (
      <div className="favorites">
         <Back />
         <h1 className="favorites__h1">Избранное</h1>
         {!!favorites.length ? (
            <CardList cards={favorites} />
         ) : (
            <div className="not-found">
               <Notfound />
               <div className="not-found__text">В Избранном пока ничего нет</div>
               <p className="not-found__text-gray">Добавляйте товары в Избранное с помощью ❤️️</p>
               <button className="btn btn__not-found" onClick={() => navigate('/')}>
                  На главную
               </button>
            </div>
         )}
      </div>
   );
};
