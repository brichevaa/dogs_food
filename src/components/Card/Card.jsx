import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { findLike } from '../../utils/utils';
import './card.css';
import { ReactComponent as Like } from './like.svg';

export const Card = ({
   product,
   pictures,
   name,
   wight,
   price,
   discount,
   onProductLike,
   setBasketCounter,
}) => {
   const { currentUser } = useContext(UserContext);

   const isLiked = findLike(product, currentUser);
   const handleLikeClick = () => {
      onProductLike(product);
   };
   return (
      <div className="card">
         <div className="card__sticky card__sticky_top-left">
            {!!discount && <span className="card__discount">{discount}%</span>}
         </div>
         <div className="card__sticky card__sticky_top-right">
            <button
               className={`card__favorite ${
                  isLiked
                     ? 'card__favorite_active'
                     : 'card__favorite_active-none'
               }`}
               onClick={handleLikeClick}
            >
               <Like className="card__liked" />
            </button>
         </div>
         <Link to={`/product/${product._id}`} className="card__link">
            <img src={pictures} alt="карточка товара" className="card__image" />
            <div className="card__description">
               <span className="card__price">{price} ₽</span>
               <span className="card__wight">{wight}</span>
               <p className="card__name">{name}</p>
            </div>
         </Link>
         <span
            onClick={() => setBasketCounter((state) => state + 1)}
            className="btn btn_type_primary "
         >
            В корзину
         </span>
      </div>
   );
};
