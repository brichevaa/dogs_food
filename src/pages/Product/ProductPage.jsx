import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { api } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { findLike } from '../../utils/utils';
import { fetchChangeLikeProduct } from '../../storageToolkit/products/productsSlice';

export const ProductPage = () => {
   const id = useParams();
   const currentUser = useSelector((state) => state.user.data);

   const [product, setProduct] = useState(null);

   const dispatch = useDispatch();

   const onProductLike = () => {
      // const wasLiked = handleProductLike(product);
      const wasLiked = findLike(product, currentUser);
      dispatch(fetchChangeLikeProduct(product));
      if (wasLiked) {
         const filteredLikes = product.likes.filter((e) => e !== currentUser._id);
         setProduct({ ...product, likes: filteredLikes });
      } else {
         const addedLikes = [...product.likes, currentUser._id];
         setProduct({ ...product, likes: addedLikes });
      }
   };
   const onSendReview = (newProduct) => {
      setProduct(() => ({ ...newProduct }));
      // setProduct(newProduct)
   };
   const deleteReview = async (id) => {
      const res = await api.deleteReview(product._id, id);
      setProduct(() => ({ ...res }));
      return res;
   };

   useEffect(() => {
      if (!id.productId) return;
      api.getProductById(id?.productId).then((data) => setProduct(data));
   }, [id?.productId]);

   return product && currentUser ? (
      <Product
         id={id.productId}
         product={product}
         onSendReview={onSendReview}
         onDeleteReview={deleteReview}
         onProductLike={onProductLike}
      />
   ) : (
      <div>Loading</div>
   );
};
