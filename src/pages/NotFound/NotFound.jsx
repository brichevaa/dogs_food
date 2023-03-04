import './notfound.css';
import React from 'react';
import { ReactComponent as Notfound } from './notfound.svg';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
   const navigate = useNavigate();

   return (
      <div className="not-found">
         <Notfound />
         <div className="not-found__text">
            Простите, по вашему запросу товаров не надено.
         </div>
         <button className="btn btn__not-found" onClick={() => navigate('/')}>
            На главную
         </button>
      </div>
   );
};
