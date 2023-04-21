import { useNavigate } from 'react-router-dom';
import './main.css';

export const MainPage = () => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate('/catalog');
   };
   return (
      <>
         <div className="main-page ">
            <div className="container">
               <div className="main-page__item">
                  <h1 className="main-page__h1">FLORA</h1>
                  <h2 className="main-page__h2">Интернет-магазин растений для вашего дома</h2>
               </div>
               <button onClick={handleClick} className="btn btn-main">
                  Каталог
               </button>
            </div>
         </div>
      </>
   );
};
