import './cardlist.css';
import { Card } from '../Card/Card';
import { CardContext } from '../../context/cardContext';
import { useContext } from 'react';

export const CardList = ({ cards }) => {
   const { handleProductLike } = useContext(CardContext);

   return (
      <div className="cards ">
         {cards?.map((item) => (
            <Card
               {...item}
               key={item._id}
               product={item}
               onProductLike={handleProductLike}
            />
         ))}
      </div>
   );
};
