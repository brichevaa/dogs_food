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
                        alt=""
                        className="img__main-page"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
