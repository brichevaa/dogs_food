import { useForm } from 'react-hook-form';
import './form.css';

export const RegistrationForm = ({ sendData }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const onSubmit = (data) => {
      console.log(data);
      // sendData(data);
   };
   // console.log({ errors });

   const nameRegister = {
      required: {
         value: true,
         message: 'Поле Email обязательное',
      },
   };
   return (
      <>
         <div>
            <h1 className="faq__h1">Регистрация</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
               <input
                  type="text"
                  placeholder="Email"
                  className="form__input"
                  {...register('email', nameRegister)}
               />
               {errors?.email && (
                  <span style={{ fontSize: '12px', color: '#7B8E98' }}>
                     {errors.email?.message}
                  </span>
               )}
               <input
                  type="password"
                  {...register('password', {
                     required: 'Пароль обязателен',
                  })}
                  placeholder="Пароль"
                  className="form__input"
               />
               {errors?.password && (
                  <span style={{ fontSize: '12px', color: '#7B8E98' }}>
                     {errors.password?.message}
                  </span>
               )}
               <button className="btn">Зарегистрироваться</button>
               <button className="btn">Войти</button>
            </form>
         </div>
      </>
   );
};
