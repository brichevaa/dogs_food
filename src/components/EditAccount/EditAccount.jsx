import { useContext } from 'react';
import './index.css';
import { UserContext } from '../../context/userContext';
import { Back } from '../Back/Back';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import { openNotification } from '../Notification/Notification';

export const EditAccount = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const { currentUser, setCurrentUser } = useContext(UserContext);

   const sendProfileData = async (data) => {
      console.log(data);
      try {
         const changedUser = await api.changeUserInfo({ name: data.name, about: data.about });
         console.log({ changedUser });
         setCurrentUser({ ...changedUser });
         openNotification('success', 'Успешно', 'Данные успешно изменены');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Не удалось изменить данные');
      }
   };

   const changeAvatar = async (data) => {
      console.log(data);
      try {
         const changedAvatar = await api.changeAvatar({ avatar: data.avatar });
         console.log(changedAvatar);
         setCurrentUser({ ...changedAvatar });
         openNotification('success', 'Успешно', 'Аватар успешно изменен');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Не удалось изменить аватар');
      }
   };

   const required = {
      required: {
         value: true,
      },
   };

   return (
      <div className="edit-account">
         <Back />
         <h1 className="profile__h1">Мои данные</h1>
         <h2 className="profile__h2">Изменить данные</h2>

         {currentUser?.name && currentUser?.about && (
            <div className="edit__wrapper">
               <Form submitForm={handleSubmit(sendProfileData)} className="edit__form">
                  <div className="edit-account__info">
                     <input {...register('name', required)} defaultValue={currentUser.name} className="auth__input" placeholder="Имя" type="text" />
                     <input {...register('about', required)} defaultValue={currentUser.about} className="auth__input" placeholder="О себе" type="text" />
                     <input {...register('email')} className="auth__input" defaultValue={currentUser.email} placeholder="Почта" disabled />
                     <input {...register('id')} className="auth__input" defaultValue={currentUser._id} placeholder="id" disabled />
                  </div>
                  <div>
                     {' '}
                     <BaseButton type="submit">Сохранить</BaseButton>
                  </div>
               </Form>
               <h2 className="profile__h2">Изменить аватар</h2>
               <Form submitForm={handleSubmit(changeAvatar)} className="edit__avatar">
                  <div className="profile__avatar">
                     <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar-img" />
                     <input {...register('avatar')} className="auth__input" defaultValue={currentUser?.avatar} placeholder="avatar" />
                  </div>
                  <div>
                     <BaseButton type="submit" className="edit__btn">
                        Сохранить
                     </BaseButton>
                  </div>
               </Form>
            </div>
         )}
      </div>
   );
};
