import { useForm } from 'react-hook-form';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import { openNotification } from '../Notification/Notification';
import './index.css';
import { useDispatch } from 'react-redux';
import { fetchAddProducts } from '../../storageToolkit/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

export const CreateProduct = ({ setModalCreateProduct }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const createProduct = async (data) => {
      console.log({ data });
      try {
         dispatch(fetchAddProducts(data));
         navigate('/catalog');
         setModalCreateProduct(false);
         openNotification('success', 'Успешно!', 'Ваш товар успешно добавлен');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Не удалось добавить товар');
      }
   };

   return (
      <div className="create-product">
         <div>
            <CloseOutlined
               onClick={() => setModalCreateProduct(false)}
               className="create-product__exit"
            />
            <Form title={'Создать товар'} submitForm={handleSubmit(createProduct)}>
               <div className="create-product__main">
                  <div>
                     <img
                        src={'https://asialedspartnership.org/default/image/default-image.jpg'}
                        alt="фото товара"
                        style={{ width: '200px' }}
                     />
                  </div>
                  <div className="create-product__input">
                     <input
                        type="text"
                        className="auth__input"
                        placeholder="Название товара"
                        {...register('name', { required: true })}
                     />
                     <input
                        type="number"
                        className="auth__input"
                        placeholder="Стоимость"
                        {...register('price', { required: true })}
                     />
                     <input
                        type="text"
                        className="auth__input"
                        placeholder="Описание"
                        {...register('description')}
                     />
                     {/* <input
                        type="text"
                        className="auth__input"
                        placeholder="Вес"
                        {...register('wight')}
                     /> */}
                  </div>
               </div>
               <input
                  type="text"
                  className="auth__input auth__input-edit"
                  placeholder="Фото товара"
                  {...register('pictures', { required: true })}
               />
               <BaseButton color="yellow" type="submit">
                  Добавить товар
               </BaseButton>
            </Form>
         </div>
      </div>
   );
};
