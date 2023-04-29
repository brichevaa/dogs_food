import './index.css';
import React, { useContext, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MinusCircleOutlined } from '@ant-design/icons';
import { ReactComponent as Basket } from './busket.svg';
import { CardContext } from '../../../context/cardContext';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, minusItem, removeItem } from '../../../storageToolkit/basket/basketSlice';
import { useDispatch } from 'react-redux';

export const BasketCard = ({ product }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // const handlePlus = (id) => {
   //    basketPlusProduct(id);
   // };

   const handlePlus = () => {
      dispatch(addItem({ id: product.id }));
   };

   // const handleMinus = (id) => {
   //    basketMinusProduct(id);
   // };

   const handleMinus = () => {
      dispatch(minusItem(product.id));
   };
   const deleteFromBusket = (id) => {
      if (window.confirm('Вы действительно хотите удалить товар?')) {
         dispatch(removeItem(id));
      }
   };
   return (
      <div className="basket-card">
         <div className="basket-card__wrapper">
            <div className="basket-card__left">
               <div className="basket-card__body">
                  <Link to={`/product/${product.id}`}>
                     <img
                        src={product.pictures}
                        alt="карточка товара"
                        className="basket-card__img"
                     />
                  </Link>
               </div>
               <Link to={`/product/${product.id}`}>
                  <div className="basket-card__info">
                     <span>{product.name}</span>
                  </div>
               </Link>
            </div>
            <div className="basket-card__right">
               <div className="basket-card__counter">
                  <div className="basket-card__btns">
                     <PlusCircleOutlined
                        className="btns__basket-card"
                        onClick={() => handlePlus()}
                     />
                     <h1>{product.count}</h1>
                     <MinusCircleOutlined
                        className="btns__basket-card"
                        onClick={() => handleMinus()}
                     />
                  </div>
               </div>
               <div>{product.price * product.count} ₽</div>
            </div>
            <Basket onClick={() => deleteFromBusket(product.id)} className="basket-card__basket" />
         </div>
      </div>
   );
};
