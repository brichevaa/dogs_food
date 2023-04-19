import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findLike } from '../../utils/utils';
import './card.css';
import { ReactComponent as Like } from './like.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
   fetchChangeLikeProduct,
   fetchDeleteProducts,
} from '../../storageToolkit/products/productsSlice';
import { api } from '../../utils/api';
import { ReactComponent as Basket } from '../Product/img/basket.svg';
import { CardContext } from '../../context/cardContext';
import { openNotification } from '../Notification/Notification';

export const Card = ({ product, pictures, name, wight, price, discount, setBasketCounter }) => {
   const currentUser = useSelector((state) => state.user.data);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const isLiked = findLike(product, currentUser);
   const handleLikeClick = () => {
      dispatch(fetchChangeLikeProduct(product));
   };

   const { setCards } = useContext(CardContext);

   const deleteCard = async (id) => {
      console.log(id);
      try {
         // dispatch(fetchDeleteProducts(id));
         await api.deleteProductById(id);
         navigate('/catalog');
         setCards((state) => state.filter((e) => e._id !== product._id));
         openNotification('success', 'Успешно!', 'Ваш товар успешно удален');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Ваш товар не был удален');
      }
   };
   // const deleteReview = async (id) => {
   //    const res = await api.deleteReview(product._id, id);    // функция по удалению ревью для примера, не раскомментировать
   //    setProduct(() => ({ ...res }));
   //    return res;
   // };

   // const deleteProduct = async () => {
   //    try {
   //      await api.deleteProductById(id);
   //      navigate('/catalog');
   //      setItems(state => state.filter(e => e._id !== id));
   //      openNotification('success', 'Успешно', 'Товар успешно удален')
   //    } catch (error) {
   //      openNotification('error', 'Ошибка', 'Товар удалить не удалось')
   //    }
   //  };

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
            <img src={pictures} alt="карточка товара" className="card__image" />
            <div className="card__description">
               <span className="card__price">{price} ₽</span>
               <span className="card__wight">{wight}</span>
               <p className="card__name">{name}</p>
            </div>
         </Link>
         <div className="card__buttons">
            <span
               onClick={() => setBasketCounter((state) => state + 1)}
               className="btn btn_type_primary "
            >
               В корзину
            </span>
            {currentUser._id === product.author._id && (
               <Basket onClick={() => deleteCard(product._id)} />
            )}
         </div>
      </div>
   );
};
