import { useContext } from 'react';
import './index.css';
import { Back } from '../Back/Back';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import { useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import { openNotification } from '../Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../../storageToolkit/user/userSlice';

export const EditAccount = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const dispatch = useDispatch();
   const currentUser = useSelector((state) => state.user.data);

   const sendProfileData = async (data) => {
      await dispatch(changeUser({ name: data.name, about: data.about }));
   };

   const changeAvatar = async (data) => {
      await dispatch(changeUser({ avatar: data.avatar }));
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
