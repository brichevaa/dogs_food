import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '../../BaseButton/BaseButton';
import { Form } from '../../Form/Form';

export const RemovePassword = ({ setModal }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const navigate = useNavigate();

   const sendData = async (data) => {
      //TODO add group to request
      console.log(data);
      // const res = await api.registerUser({ ...data, group: 'group-10' });
   };

   const handleClick = (e) => {
      e.preventDefault();
      navigate('/login');
   };

   const emailRegister = register('email', {
      required: 'Это обязательное поле',
   });
   useEffect(() => {
      setModal(true);
   }, [setModal]);

   return (
      <>
         <Form
            submitForm={handleSubmit(sendData)}
            title="Восстановление пароля"
         >
            <div className="auth__controls">
               <span className="auth__remove-password-left">
                  Для получения временного пароля необходимо ввести email,
                  указанный при регистрации.
               </span>
               <input
                  type="text"
                  placeholder="Email"
                  className="auth__input"
                  {...emailRegister}
               />
               {errors?.email && (
                  <span
                     style={{
                        fontSize: '10px',
                        color: 'red',
                        lineHeight: '12px',
                     }}
                  >
                     {errors.email?.message}
                  </span>
               )}
               <BaseButton onClick={handleClick} type="submit" color="yellow">
                  <span>Отправить</span>
               </BaseButton>
               <span className="auth__remove-password-left">
                  Срок действия временного пароля 24 ч.
               </span>
            </div>
         </Form>
      </>
   );
};
