import './index.css';
import { BasketCard } from '../BasketCard/BasketCard';
import { useSelector } from 'react-redux';

export const BasketCardlist = () => {
   const { items, totalPrice } = useSelector((state) => state.basket);

   return (
      <div className="basket-cards">
         {items.map((item) => (
            <BasketCard {...item} key={item.id} product={item} />
         ))}
         <h1 className="favorites__h1 favorites__h1-right">Итого: {totalPrice} ₽</h1>
      </div>
   );
};
