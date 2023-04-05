import { useContext } from 'react';
import { Back } from '../Back/Back';
import './profile.css';
import { UserContext } from '../../context/userContext';
import Mail from './mail.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BaseButton } from '../BaseButton/BaseButton';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
   const { currentUser } = useContext(UserContext);

   const navigate = useNavigate();

   const handleClick = (e) => {
      e.preventDefault();
      navigate('/edit-account');
   };

   const exitProfile = () => {
      localStorage.removeItem('token');
      navigate('/login');
   };
   return (
      <>
         <div className="profile">
            <Back />
            <h1 className="profile__h1">Профиль</h1>
            <div className="profile__info">
               <FontAwesomeIcon icon={faUser} />
               <h2 className="profile__h2">{currentUser.name}</h2>
               <img src={Mail} alt="" className="profile__logo-mail" />
               <span>{currentUser.email}</span>
            </div>
            <BaseButton className="profile__button-change" onClick={handleClick}>
               Изменить
            </BaseButton>
            <BaseButton className="profile__button-exit" onClick={exitProfile}>
               Выйти
            </BaseButton>
         </div>
      </>
   );
};
