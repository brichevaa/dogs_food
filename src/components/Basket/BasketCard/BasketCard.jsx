import './index.css';
import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { minus, plus } from '../../../storageToolkit/cart/counterSlice';

export const BasketCard = ({ product }) => {
   const counterState = useSelector((state) => state.counter.value);

   const dispatch = useDispatch();

   const handlePlus = () => {
      dispatch(plus(1));
   };
   const handleMinus = () => {
      dispatch(minus(1));
   };
   return (
      <div className="basket-card">
         <div className="basket-card__wrapper">
            <div className="basket-card__body">
               <img src={product.pictures} alt="карточка товара" className="basket-card__img" />
            </div>
            <div className="basket-card__info">
               <span>{product.name}</span>
               <span>{product.description}</span>
            </div>
            <div className="basket-card__counter">
               <div className="basket-card__btns">
                  <PlusCircleOutlined className="btns__basket-card" onClick={handlePlus} />
                  <h1>{counterState}</h1>
                  <MinusCircleOutlined className="btns__basket-card" onClick={handleMinus} />
               </div>
            </div>
            <div>{product.price} ₽</div>
         </div>
      </div>
   );
};
