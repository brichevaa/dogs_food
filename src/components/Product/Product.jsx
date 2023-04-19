import s from './index.module.css';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import cn from 'classnames';
import { ReactComponent as Save } from './img/save.svg';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { findLike } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { Rate } from '../Rate/Rate';
import { useForm } from 'react-hook-form';
import { BaseButton } from '../BaseButton/BaseButton';
import { FormReviews } from '../FormReviews/FormReviews';
import { ReactComponent as Basket } from './img/basket.svg';
import { openNotification } from '../Notification/Notification';
import { Back } from '../Back/Back';
import { useSelector } from 'react-redux';

export const Product = ({ id, product, onSendReview, onDeleteReview, onProductLike }) => {
   const [rating, setRating] = useState(3);
   const [currentRating, setCurrentRating] = useState(0);
   const [reviewsProduct, setReviewsProduct] = useState(product.reviews.slice(0, 3) ?? []);
   const [users, setUsers] = useState([]);
   const [showForm, setShowForm] = useState(false);
   const [reviews, setReviews] = useState();
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ mode: 'onSubmit' });

   const currentUser = useSelector((state) => state.user.data);

   const sendReview = async (data) => {
      try {
         const newProduct = await api.addReview(product._id, { text: data.review, rating: rating });
         onSendReview(newProduct);
         setReviewsProduct(() => [...newProduct.reviews]);
         setShowForm(false);
         reset();
         openNotification('success', 'Успешно!', 'Ваш отзыв успешно отправлен');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Что-то пошло не так...');
      }
   };

   const deleteReview = async (id) => {
      try {
         const res = await onDeleteReview(id);
         setReviewsProduct(() => [...res.reviews]);
         openNotification('success', 'Успешно!', 'Ваш отзыв успешно удален');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Что-то пошло не так...');
      }
   };

   const showReviews = () => {
      setReviewsProduct([...product.reviews]);
   };

   const navigate = useNavigate();

   const [isLikedProduct, setIsLikedProduct] = useState(false);

   useEffect(() => {
      const isLiked = product?.likes?.some((el) => el === currentUser._id);
      setIsLikedProduct(isLiked);
   }, [product.likes]);

   useEffect(() => {
      api.getUsers().then((data) => setUsers(data));
   }, []);

   const getUser = (id) => {
      // console.log(id);
      if (!users.length) return 'User';
      const user = users.find((e) => e._id === id);
      // console.log(user);
      if (user?.avatar.includes('default-image')) {
         return {
            ...user,
            avatar:
               'https://avatars.mds.yandex.net/i?id=e67c20f98bdc512c5d3bc20c140f8fac-5719595-images-taas-consumers&n=27&h=480&w=480',
         };
      }

      return user;
   };

   useEffect(() => {
      if (!product?.reviews) return;
      const rateAcc = product.reviews.reduce((acc, el) => (acc = acc + el.rating), 0);
      // console.log({ rateAcc });
      const sum = Math.floor(rateAcc / product.reviews.length);
      setRating(sum);
      setCurrentRating(sum);
   }, [product?.reviews]);

   // console.log(currentRating);

   const onLike = () => {
      onProductLike(product);
      // setIsLikedProduct((state) => !state);
   };

   const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
   };

   const textRegister = register('review', {
      required: 'Это обязательное поле',
   });

   return (
      <>
         <div className={s.header}>
            <Back />
            <h1 className={s.h1}>{product.name}</h1>
            <div className={s.info}>
               <span>
                  Артикул: <b>2388907</b>
               </span>
               <Rate rating={currentRating} setRating={() => {}} />
               <span>{product?.reviews?.length} отзывов</span>
            </div>
         </div>
         <div className={s.product}>
            <div className={s.imgWrapper}>
               <img className={s.img} src={product.pictures} alt={`Изображение`} />
               {product.tags?.map((e) => (
                  <span key={e} className={`tag tag_type_${e}`}>
                     {e}
                  </span>
               ))}
            </div>
            <div className={s.desc}>
               <span className={s.price}>{product.price}&nbsp;₽</span>
               {!!product.discount && (
                  <span className={`${s.price} card__price_type_discount`}>
                     {product.discount}&nbsp;%
                  </span>
               )}
               <div className={s.btnWrap}>
                  <div className={s.left}>
                     <button className={s.minus}>-</button>
                     <span className={s.num}>0</span>
                     <button className={s.plus}>+</button>
                  </div>
                  <a href="/#" className={`btn btn_type_primary ${s.cart}`}>
                     В корзину
                  </a>
               </div>
               <button
                  className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })}
                  onClick={(e) => onLike(e)}
               >
                  <Save />
                  <span>{isLikedProduct ? 'В избранном' : 'В избранное'}</span>
               </button>
               <div className={s.delivery}>
                  <img src={truck} alt="truck" />
                  <div className={s.right}>
                     <h3 className={s.name}>Доставка по всему Миру!</h3>
                     <p className={s.text}>
                        Доставка курьером — <span className={s.bold}>от 399 ₽</span>
                     </p>
                  </div>
               </div>
               <div className={s.delivery}>
                  <img src={quality} alt="quality" />
                  <div className={s.right}>
                     <h3 className={s.name}>Доставка по всему Миру!</h3>
                     <p className={s.text}>
                        Доставка курьером — <span className={s.bold}>от 399 ₽</span>
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className={s.box}>
            <h2 className={s.title}>Описание</h2>
            <div>{product.description}</div>
            <h2 className={s.title}>Характеристики</h2>
            <div className={s.grid}>
               <div className={s.naming}>Вес</div>
               <div className={s.description}>{product.wight}</div>
               <div className={s.naming}>Цена</div>
               <div className={s.description}>{product.price} ₽ за 100 грамм</div>
               <div className={s.naming}>Польза</div>
               <div className={s.description}>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas sapiente
                     molestiae consequuntur doloremque nisi ullam quos ut nulla, ipsum veniam, quo
                     voluptatem. Pariatur ullam animi omnis eius laborum dolorum!
                  </p>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nobis
                     est, distinctio error cupiditate, nostrum mollitia blanditiis repudiandae quia
                     alias eligendi cum aperiam unde voluptatibus accusantium magni pariatur nemo
                     expedita!
                  </p>
               </div>
            </div>
         </div>
         <div>
            <h1 className={s.productTitle__reviews}>Отзывы</h1>
         </div>
         <div>
            <BaseButton onClick={() => setShowForm(true)} className={s.review__btn}>
               Написать отзыв
            </BaseButton>

            {showForm && (
               <FormReviews submitForm={handleSubmit(sendReview)} className={s.review__submit}>
                  {/* <span className={s.naming}>Оставьте ваш отзыв ниже в специальном поле</span> */}
                  <Rate rating={rating} setRating={setRating} isEdit={true} />
                  <textarea
                     {...textRegister}
                     className={s.textarea}
                     placeholder="Оставьте ваш отзыв"
                  />
                  <BaseButton type="submit" color="yellow" style={{ width: '200px' }}>
                     Отправить отзыв
                  </BaseButton>
               </FormReviews>
            )}
         </div>
         <div>
            {users &&
               reviewsProduct
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map((r) => (
                     <div key={r._id} className={s.reviews}>
                        <div className={s.reviews__author}>
                           <div className={s.reviews__info}>
                              <img
                                 src={getUser(r.author)?.avatar}
                                 alt="avatar"
                                 className={s.reviews__avatar}
                              />
                              <span>{`${getUser(r.author)?.name ?? 'User'} `}</span>
                              <span className={s.reviews__date}>
                                 {new Date(r.created_at).toLocaleString('ru', options)}
                              </span>
                           </div>
                           <Rate rating={r.rating} isEdit={false} />
                        </div>
                        <div className={s.reviews__text}>
                           <span>{r.text}</span>
                           {currentUser._id === r.author && (
                              <Basket
                                 onClick={() => deleteReview(r._id)}
                                 className={s.basketIcon}
                              />
                           )}
                        </div>
                     </div>
                  ))}
            <BaseButton className={s.button__allReviews} onClick={() => showReviews()}>
               Все отзывы {'>'}
            </BaseButton>
         </div>
      </>
   );
};
