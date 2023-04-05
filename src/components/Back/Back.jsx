import { useNavigate } from 'react-router-dom';
import './back.css';

export const Back = () => {
   const navigate = useNavigate();
   return (
      <span onClick={() => navigate(-1)} className="back">
         {'<'} Назад
      </span>
   );
};
