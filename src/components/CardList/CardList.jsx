import './cardlist.css';
import { Card } from '../Card/Card';
import { useEffect, useState } from 'react';

export const CardList = ({ cards, handleProductLike, currentUser }) => {
   return (
      <div className="cards container">
         {cards.map((item) => (
            <Card
               {...item}
               key={item._id}
               onProductLike={handleProductLike}
               product={item}
               currentUser={currentUser}
            />
         ))}
      </div>
   );
};
