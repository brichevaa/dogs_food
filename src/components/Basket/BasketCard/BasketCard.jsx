import './index.css';
import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MinusCircleOutlined } from '@ant-design/icons';
import { ReactComponent as Basket } from './busket.svg';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, minusItem, removeItem } from '../../../storageToolkit/basket/basketSlice';
import { useDispatch } from 'react-redux';
import { ReactComponent as Minus } from './minus.svg';

export const BasketCard = ({ product }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handlePlus = () => {
      dispatch(addItem({ id: product.id }));
   };

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
                     <button
                        onClick={() => handleMinus()}
                        className="btns__basket-card"
                        disabled={product.count === 1}
                     >
                        -
                     </button>
                     {/* <MinusCircleOutlined
                        disabled={product.count === 1}
                        className="btns__basket-card"
                        onClick={() => handleMinus()}
                     />{' '} */}
                     <h1 className="basket-card__count">{product.count}</h1>
                     {/* <PlusCircleOutlined
                        className="btns__basket-card"
                        onClick={() => handlePlus()}
                     /> */}
                     <button onClick={() => handlePlus()} className="btns__basket-card">
                        +
                     </button>
                  </div>
               </div>
               <b>
                  <div>{product.price * product.count} ₽</div>
               </b>
            </div>
            <Basket onClick={() => deleteFromBusket(product.id)} className="basket-card__basket" />
         </div>
      </div>
   );
};
