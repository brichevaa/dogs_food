import React, { useState } from 'react';
import './cart.css';
import { Back } from '../Back/Back';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BasketCardlist } from './BacketCardlist/BasketCardlist';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

export const Basket = () => {
   const navigate = useNavigate();
   const { basketItems } = useContext(CardContext);
   return (
      <div className="basket">
         <Back />
         <h1 className="favorites__h1">Корзина товаров</h1>
         {!!basketItems.length ? (
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
