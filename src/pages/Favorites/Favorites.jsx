import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

export const Favorites = () => {
   const { favorites } = useContext(CardContext);

   return <div>favorites</div>;
};
