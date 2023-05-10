import { useNavigate } from 'react-router-dom';
import './main.css';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export const MainPage = () => {
   const { searchRequest } = useContext(UserContext);

   const navigate = useNavigate();

   const handleClick = () => {
      navigate('/catalog');
   };

   if (searchRequest) {
      navigate('/catalog');
   }
   return (
      <>
         <div className="main-page ">
            <div className="container">
               <div className="main-page__body">
                  <div className="main-page__item">
                     <h1 className="main-page__h1">FLORA</h1>
                     <h2 className="main-page__h2">Интернет-магазин растений для вашего дома</h2>
                     <button onClick={handleClick} className="btn btn-main">
                        Каталог
                     </button>
                  </div>
                  <div className="main-page__img">
                     <img
                        src={
                           'https://images.pexels.com/photos/213727/pexels-photo-213727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        }
                        // src="https://images.pexels.com/photos/3153521/pexels-photo-3153521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="главная картинка"
                        className="img__main-page"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
