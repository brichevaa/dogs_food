import './cardlist.css';
import { Card } from '../Card/Card';
import { useEffect, useState } from 'react';

export const CardList = ({ cards }) => {
  return (
    <div className="cards container">
      {cards.map((item) => (
        <Card {...item} key={item.name} />
      ))}
    </div>
  );
};
