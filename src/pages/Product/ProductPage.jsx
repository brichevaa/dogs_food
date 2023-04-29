import { useEffect, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { api } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { findLike } from '../../utils/utils';
import { fetchChangeLikeProduct } from '../../storageToolkit/products/productsSlice';
import { changeLikeStatus, fetchSingleProduct } from '../../storageToolkit/singleProduct/singleProductSlice';

export const ProductPage = () => {
   const idParamsInSearchQuery = useParams();
   const actualUser = useSelector((state) => state.user.data);
   const dispatch = useDispatch();

   // const [product, setProduct] = useState(null);
   const {product: singleProduct, loading} = useSelector((state) => state.product);
   // console.log({ singleProduct });

   const onProductLike = () => {
      const wasLiked = findLike(singleProduct, actualUser);
      console.log({singleProduct});
      dispatch(fetchChangeLikeProduct(singleProduct));
      if (wasLiked) {
         const filteredLikes = singleProduct.likes.filter((e) => e !== actualUser._id);
         console.log(filteredLikes);
         // setProduct({ ...product, likes: filteredLikes });
         dispatch(changeLikeStatus(filteredLikes));
         // dispatch(fetchSingleProduct(idParamsInSearchQuery.id));
      } else {
         const addedLikes = [...singleProduct.likes, actualUser._id];
         console.log(addedLikes);
         dispatch(changeLikeStatus(addedLikes));

         // setProduct({ ...product, likes: addedLikes });
         // dispatch(fetchSingleProduct(idParamsInSearchQuery.id));
      }
   };
   const onSendReview = (newProduct) => {
      // console.log(newProduct);
      dispatch(fetchSingleProduct(newProduct._id));
      // setProduct(() => ({ ...newProduct }));
   };
   const deleteReview = async (id) => {
      const res = await api.deleteReview(singleProduct._id, id);
      // setProduct(() => ({ ...res }));
      dispatch(fetchSingleProduct(res._id));

      return res;
   };
   const onUpdateProduct = (newProduct) => {
      // setProduct(() => ({ ...newProduct }));
      dispatch(fetchSingleProduct(newProduct._id));
   };
   // useEffect(() => {
   //    if (!idParamsInSearchQuery.id) return;
   //    api.getProductById(idParamsInSearchQuery?.id).then((data) => setProduct(data));
   // }, [idParamsInSearchQuery?.id]);

   useEffect(() => {
      if (!idParamsInSearchQuery.id) return;
      dispatch(fetchSingleProduct(idParamsInSearchQuery.id));
   }, [idParamsInSearchQuery?.id]);

   // singleProduct === {}; !!!! DEPRECATED
   // JSON.stringify(singleProduct) === '{}' 
   // !!Object.keys(singleProduct).length

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
      <div className="loading">Loading</div>
   );
};
