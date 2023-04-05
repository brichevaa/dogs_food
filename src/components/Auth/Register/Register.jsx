import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../utils/authApi';
import { pattern } from '../../../utils/validations';
import { BaseButton } from '../../BaseButton/BaseButton';
import { Form } from '../../Form/Form';

export const Register = ({ setModal }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const navigate = useNavigate();

   const handleClick = (e) => {
      e.preventDefault();
      navigate('/login');
   };

   const sendData = async (data) => {
      try {
         const res = await authApi.registerUser({ ...data, group: 'group-10' });
         navigate('/login');
      } catch (error) {
         alert(error);
      }
   };
   const emailRegister = register('email', {
      required: 'Это обязательное поле',
   });
   const passwordRegister = register('password', {
      required: 'Это обязательное поле',
      pattern: pattern,
   });

   useEffect(() => {
      setModal(true);
   }, [setModal]);

   return (
      <>
         <Form submitForm={handleSubmit(sendData)} title="Регистрация">
            <div className="auth__controls">
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
               <input
                  type="password"
                  placeholder="Пароль"
                  className="auth__input"
                  {...passwordRegister}
               />
               {errors?.password && (
                  <span
                     style={{
                        fontSize: '10px',
                        color: 'red',
                        lineHeight: '12px',
                     }}
                  >
                     {errors.password?.message}
                  </span>
               )}
               <span className="auth__remove-password-left">
                  Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
                  Политикой конфиденциальности и соглашаетесь на информационную
                  рассылку.
               </span>
               <BaseButton color="yellow">
                  <span>Зарегистрироваться</span>
               </BaseButton>
               <BaseButton onClick={handleClick} type="submit">
                  <span>Войти</span>
               </BaseButton>
            </div>
         </Form>
      </>
   );
};
