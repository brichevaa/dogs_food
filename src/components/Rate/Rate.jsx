import { useCallback, useEffect, useState } from 'react';
import s from './rate.module.css';
import { ReactComponent as Star } from './star.svg';
import cn from 'classnames';

export const Rate = ({ rating, setRating, currentRating, isEdit = false }) => {
   // создаем пустые реакт фрагменты, чтобы потом в них положить свг
   const emptyFragments = new Array(5).fill(<></>);
   const [rate, setRate] = useState(emptyFragments);

   const changeStar = (rating) => {
      // setRating(rating);
      if (!isEdit) return;
      constructRating(rating);
   };
   const changeRating = (r) => {
      if (!isEdit) return;
      setRating(r);
   };

   const constructRating = useCallback(
      (rateItem) => {
         const updatedArr = rate.map((e, index) => (
            <Star
               key={index}
               className={cn(s.star, {
                  [s.filled]: index < rateItem,
                  [s.editable]: isEdit,
               })}
               onMouseEnter={() => changeStar(index + 1)}
               onMouseLeave={() => changeStar(rating)}
               onClick={() => changeRating(index + 1)}
            />
         ));
         setRate(updatedArr);
      },
      [isEdit, rating]
   );

   useEffect(() => {
      constructRating(rating);
   }, [constructRating]);

   return (
      <div>
         {rate.map((e, i) => (
            <span key={i}>{e}</span>
         ))}
      </div>
   );
};
