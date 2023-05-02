import { useForm } from 'react-hook-form';
import './index.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { BaseButton } from '../../../components/BaseButton/BaseButton';
import { Form } from '../../../components/Form/Form';
import { openNotification } from '../../../components/Notification/Notification';
import { api } from '../../../utils/api';
import { useContext } from 'react';
import { CardContext } from '../../../context/cardContext';

export const EditProduct = ({ setModalEditProduct, id, onUpdateProduct, product }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onSubmit' });

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { cards, setCards } = useContext(CardContext);

   const editProduct = async (data) => {
      console.log({ data });
      try {
         // dispatch(fetchAddProducts(data));
         const newProduct = await api.changeProduct(id, { ...data });
         onUpdateProduct(newProduct);
         setCards([...cards]);
         setModalEditProduct(false);
         openNotification('success', 'Успешно!', 'Ваш товар успешно обновлен');
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Не удалось обновить товар');
      }
   };

   return (
      <div className="create-product">
         <div>
            <CloseOutlined
               onClick={() => setModalEditProduct(false)}
               className="create-product__exit"
            />
            <Form
               title={'Редактировать товар'}
               submitForm={handleSubmit(editProduct)}
               className="edit__product-form"
            >
               <div className="edit__product">
                  <div>
                     <img src={product.pictures} alt="фото товара" style={{ width: '200px' }} />
                  </div>
                  <div className="edit__product-input">
                     <input
                        type="text"
                        className="auth__input"
                        placeholder="Название товара"
                        defaultValue={product.name}
                        {...register('name', { required: true })}
                     />
                     <input
                        type="number"
                        className="auth__input"
                        placeholder="Стоимость"
                        defaultValue={product.price}
                        {...register('price', { required: true })}
                     />
                     <input
                        type="text"
                        className="auth__input"
                        placeholder="Описание"
                        defaultValue={product.description}
                        {...register('description')}
                     />
                     <input
                        type="text"
                        className="auth__input"
                        placeholder="Вес"
                        defaultValue={product.wight}
                        {...register('wight')}
                     />
                  </div>
               </div>
               <input
                  type="text"
                  className="auth__input auth__input-edit"
                  placeholder="Фото товара"
                  defaultValue={product.pictures}
                  {...register('pictures', { required: true })}
               />
               <BaseButton color="yellow" type="submit" className="edit__product-button">
                  Отправить
               </BaseButton>
            </Form>
         </div>
      </div>
   );
};
