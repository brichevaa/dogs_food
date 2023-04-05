import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../utils/authApi';
import { pattern } from '../../../utils/validations';
import { BaseButton } from '../../BaseButton/BaseButton';
import { Form } from '../../Form/Form';

export const RemovePassword = ({ setModal }) => {
   const [tokenResp, setTokenResp] = useState(null);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const navigate = useNavigate();

   const sendData = async (data) => {
      console.log({ data });

      if (!tokenResp) {
         try {
            const res = await authApi.resetPass(data);
            console.log({ res });
            setTokenResp(true);
         } catch (error) {
            console.log({ error });
            alert('Что-то пошло не так');
         }
      } else {
         console.log({ data });

         try {
            const res = await authApi.changePass(data.token, {
               password: data.password,
            });
            console.log({ res });
            localStorage.setItem('token', res.token);
            navigate('/');
         } catch (error) {
            console.log({ error });
            alert('Что-то пошло не так');
         }
      }
   };

   const emailRegister = register('email', {
      required: 'Это обязательное поле',
   });
   const passwordRegister = register('password', {
      required: tokenResp ? 'Пароль обязателен' : false,
      pattern: pattern,
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
               {tokenResp && (
                  <>
                     <input
                        type="password"
                        placeholder="Введите новый пароль"
                        className="auth__input"
                        {...passwordRegister}
                        disabled={!tokenResp}
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
                     <input
                        type={'text'}
                        {...register('token', {
                           required: tokenResp ? 'Токен обязателен' : false,
                        })}
                        placeholder="Введите токен из полученного письма"
                        className="auth__input"
                        disabled={!tokenResp}
                     />
                  </>
               )}

               <BaseButton type="submit" color="yellow">
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
