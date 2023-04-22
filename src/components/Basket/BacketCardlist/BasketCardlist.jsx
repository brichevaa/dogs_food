import './index.css';
import { BasketCard } from '../BasketCard/BasketCard';

export const BasketCardlist = ({ cards }) => {
   return (
      <div className="basket-cards">
         {cards.map((item) => (
            <BasketCard {...item} key={item._id} product={item} />
         ))}
      </div>
   );
};
