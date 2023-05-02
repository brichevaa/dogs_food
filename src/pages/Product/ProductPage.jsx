import { useEffect, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { api } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { findLike } from '../../utils/utils';
import { fetchChangeLikeProduct } from '../../storageToolkit/products/productsSlice';
import {
   fetchSingleProduct,
   changeLikeStatus,
} from '../../storageToolkit/singleProduct/singleProductSlice';

export const ProductPage = () => {
   const idParamsInSearchQuery = useParams();
   const actualUser = useSelector((state) => state.user.data);
   const dispatch = useDispatch();

   const { product: singleProduct, loading } = useSelector((state) => state.product);

   const onProductLike = () => {
      const wasLiked = findLike(singleProduct, actualUser);
      dispatch(fetchChangeLikeProduct(singleProduct));
      if (wasLiked) {
         const filteredLikes = singleProduct.likes.filter((e) => e !== actualUser._id);
         dispatch(changeLikeStatus(filteredLikes));
      } else {
         const addedLikes = [...singleProduct.likes, actualUser._id];
         dispatch(changeLikeStatus(addedLikes));
      }
   };
   const onSendReview = (newProduct) => {
      dispatch(fetchSingleProduct(newProduct._id));
   };
   const deleteReview = async (id) => {
      const res = await api.deleteReview(singleProduct._id, id);
      dispatch(fetchSingleProduct(res._id));

      return res;
   };
   const onUpdateProduct = (newProduct) => {
      dispatch(fetchSingleProduct(newProduct._id));
   };

   useEffect(() => {
      if (!idParamsInSearchQuery.id) return;
      dispatch(fetchSingleProduct(idParamsInSearchQuery.id));
   }, [idParamsInSearchQuery?.id]);

   return !loading && actualUser ? (
      <Product
         id={idParamsInSearchQuery.id}
         product={singleProduct}
         onSendReview={onSendReview}
         onDeleteReview={deleteReview}
         onProductLike={onProductLike}
         onUpdateProduct={onUpdateProduct}
      />
   ) : (
      <div className="loading">Loading...</div>
   );
};
