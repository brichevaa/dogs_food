import { useForm } from 'react-hook-form';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import { api } from '../../utils/api';
import { openNotification } from '../Notification/Notification';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
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

   const { cards, setCards } = useContext(CardContext);

   const createProduct = async (data) => {
      console.log({ data });
      try {
         const result = await api.addProduct({ ...data });
         navigate('/catalog');
         setCards([...cards, result]);
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
               <input
                  type="text"
                  className="auth__input"
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
