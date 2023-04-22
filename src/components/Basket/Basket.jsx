import React, { useState } from 'react';
import './cart.css';
import { Back } from '../Back/Back';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BasketCardlist } from './BacketCardlist/BasketCardlist';

export const Basket = () => {
   const { favorites } = useSelector((state) => state.products);

   const navigate = useNavigate();
   return (
      <div className="cart">
         <Back />
         <h1 className="favorites__h1">Корзина товаров</h1>
         {!!favorites.length ? (
            <BasketCardlist cards={favorites} />
         ) : (
            <div className="not-found">
               <div className="not-found__text">В корзине пока ничего нет</div>
               <button className="btn btn__not-found" onClick={() => navigate('/main')}>
                  На главную
               </button>
            </div>
         )}
      </div>
   );
};
