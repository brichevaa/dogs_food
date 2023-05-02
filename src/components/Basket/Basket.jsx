import React from 'react';
import './cart.css';
import { Back } from '../Back/Back';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BasketCardlist } from './BacketCardlist/BasketCardlist';
import { clearItems } from '../../storageToolkit/basket/basketSlice';

export const Basket = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { items } = useSelector((state) => state.basket);

   const onClearBasket = () => {
      if (window.confirm('Вы действительно хотите очистить корзину?')) {
         dispatch(clearItems());
      }
   };

   return (
      <div className="basket">
         <Back />
         <div className="basket__header">
            <h1 className="favorites__h1">Корзина товаров</h1>
            <span onClick={() => onClearBasket()} className="basket__clear">
               Очистить корзину
            </span>
         </div>
         {!!items.length ? (
            <BasketCardlist />
         ) : (
            <div className="not-found">
               <div className="not-found__text">В корзине пока ничего нет</div>
               <button className="btn btn__not-found" onClick={() => navigate('/catalog')}>
                  Вернуться в каталог
               </button>
            </div>
         )}
      </div>
   );
};
