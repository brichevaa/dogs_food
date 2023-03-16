import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import './login.css';

export const Login = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const navigate = useNavigate();

   const handleClick = (e) => {
      e.preventDefault();
      navigate('/favorites');
   };
   const sendData = (data) => {
      console.log(data);
   };

   return (
      <>
         <Form submitForm={handleSubmit(sendData)} title="Вход">
            <div className="auth__controls">
               <input
                  type="text"
                  placeholder="Email"
                  className="auth__input"
                  {...register('email', {
                     required: 'email is required',
                  })}
               />
               <input
                  type="password"
                  placeholder="Пароль"
                  className="auth__input"
                  {...register('password', {
                     pattern: {
                        message:
                           'Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру',
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                     },
                  })}
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
               <span className="auth__remove-password">
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
