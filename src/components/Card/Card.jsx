import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findLike } from '../../utils/utils';
import './card.css';
import { ReactComponent as Like } from './like.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
   fetchChangeLikeProduct,
   fetchDeleteProducts,
} from '../../storageToolkit/products/productsSlice';
import { ReactComponent as Basket } from '../Product/img/basket.svg';
import { openNotification } from '../Notification/Notification';

export const Card = ({ product, pictures, name, wight, price, discount, onPlus }) => {
   const actualUser = useSelector((state) => state.user.data);
   // const [isAdded, setIsAdded] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // console.log(product);

   const cartItem = useSelector((state) =>
      state.basket.items.find((obj) => obj.id === product._id)
   );
   const addedCount = cartItem ? cartItem.count : 0;

   // console.log(product);

   const isLiked = findLike(product, actualUser);
   const handleLikeClick = () => {
      dispatch(fetchChangeLikeProduct(product));
   };

   const deleteCard = async (id) => {
      try {
         if (window.confirm('Вы действительно хотите удалить товар?')) {
            dispatch(fetchDeleteProducts(id));
            navigate('/catalog');
            openNotification('success', 'Успешно!', 'Ваш товар успешно удален');
         }
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Ваш товар не был удален');
      }
   };

   const onClickToBasket = () => {
      onPlus(product);
      // setIsAdded(!isAdded);
   };

   return (
      <div className="card">
         <div className="card__sticky card__sticky_top-left">
            {!!discount && <span className="card__discount">{discount}%</span>}
         </div>
         <div className="card__sticky card__sticky_top-right">
            <button
               className={`card__favorite ${
                  isLiked ? 'card__favorite_active' : 'card__favorite_active-none'
               }`}
               onClick={handleLikeClick}
            >
               <Like className="card__liked" />
            </button>
         </div>
         <Link to={`/product/${product._id}`} className="card__link">
            <div className="card__body">
               <img src={pictures} alt="карточка товара" className="card__image" />
            </div>
            <div className="card__description">
               <span className="card__price">{price} ₽</span>
               <span className="card__wight">{wight}</span>
               <p className="card__name">{name}</p>
            </div>
         </Link>
         <div className="card__buttons">
            <span
               onClick={() => onClickToBasket()}
               className={`btn btn_type_primary`}
               // className={`btn btn_type_primary ${
               //    isAdded ? 'btn_type_primary-active' : 'btn_type_primary'
               // }`}
            >
               {/* {isAdded ? <Link to={'/cart'}>В корзине</Link> : 'В корзину'} */}
               {/* {isAdded ? 'В корзине' : 'В корзину'} */}В корзину
            </span>
            {addedCount > 0 && <span className="added-count">{addedCount}</span>}
            {actualUser._id === product.author._id && (
               <Basket onClick={() => deleteCard(product._id)} className="card__basket" />
            )}
         </div>
      </div>
   );
};
