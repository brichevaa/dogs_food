import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { api } from '../../utils/api';
import { useSelector } from 'react-redux';

export const ProductPage = () => {
   const id = useParams();
   const currentUser = useSelector((state) => state.user.data);

   const [product, setProduct] = useState(null);

   const onSendReview = (newProduct) => {
      setProduct(() => ({ ...newProduct }));
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

   return product && currentUser ? <Product id={id.productId} product={product} onSendReview={onSendReview} onDeleteReview={deleteReview} /> : <div>Loading</div>;
};
