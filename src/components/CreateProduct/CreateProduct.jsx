import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';

export const CreateProduct = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

consy createProduct = (data) => {
   console.log({data});
}

   return (
      <div>
         <span>x</span>
         <div>
            <Form title={'Создать товар'} submitForm={handleSubmit(createProduct)}>
               <input type="text" className='auth__input' placeholder='name' {...register('name', {required: true})} />
               <input type="number" className='auth__input' placeholder='name' {...register('number', {required: true})} />
               <input type="text" className='auth__input' placeholder='name' {...register('name', {required: true})} />
               <input type="text" className='auth__input' placeholder='name' {...register('name', {required: true})} />
               <BaseButton color='yellow' type = "submit">Добавить товар</BaseButton>
            </Form>

         </div>
      </div>
   );
};
