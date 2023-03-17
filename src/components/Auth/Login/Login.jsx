import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api';
import { pattern } from '../../../utils/validations';
import { BaseButton } from '../../BaseButton/BaseButton';
import { Form } from '../../Form/Form';
import '../auth.css';

export const Login = ({ setModal }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const navigate = useNavigate();

   const handleClick = (e) => {
      e.preventDefault();
      navigate('/register');
   };
   const sendData = async (data) => {
      try {
         const res = await api.login(data);
         console.log(res);
         localStorage.setItem('token', res.token);
         navigate('/');
      } catch (error) {
         console.log('error');
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
         <Form submitForm={handleSubmit(sendData)} title="Вход">
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
               <span
                  className="auth__remove-password"
                  onClick={() => navigate('/removepassword')}
               >
                  Восстановить пароль
               </span>
               <BaseButton type="submit" color="yellow">
                  <span>Войти</span>
               </BaseButton>
               <BaseButton onClick={handleClick}>
                  <span>Регистрация</span>
               </BaseButton>
            </div>
         </Form>
      </>
   );
};
