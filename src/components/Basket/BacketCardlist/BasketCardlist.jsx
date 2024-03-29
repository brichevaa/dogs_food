import './index.css';
import { BasketCard } from '../BasketCard/BasketCard';
import { useContext } from 'react';
import { CardContext } from '../../../context/cardContext';

export const BasketCardlist = () => {
   const { basketItems } = useContext(CardContext);
   const { onRemoveFromBusket } = useContext(CardContext);

   const totalPrice = basketItems.reduce((sum, product) => product.priceTotal + sum, 0);

   return (
      <div className="basket-cards">
         {basketItems.map((item, index) => (
            <BasketCard {...item} key={index} product={item} onDelete={onRemoveFromBusket} />
         ))}
         <h1 className="favorites__h1 favorites__h1-right">Итого: {totalPrice} ₽</h1>
      </div>
   );
};
