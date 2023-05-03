import './icons.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/userContext';
import { useSelector } from 'react-redux';
import { CreateProduct } from '../../CreateProduct/CreateProduct';
import { UserOutlined } from '@ant-design/icons';
import { HeartOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CardContext } from '../../../context/cardContext';
import { ModalEdit } from '../../Modal/ModalEdit/ModalEdit';

export const Icons = () => {
   const [modalCreateProduct, setModalCreateProduct] = useState(false);

   const { isAuth } = useContext(UserContext);
   const { setModal } = useContext(CardContext);

   const { favorites } = useSelector((state) => state.products);
   const { items } = useSelector((state) => state.basket);

   const totalCount = items.reduce((sum, item) => sum + item.count, 0);

   return (
      <>
         <Link to={'/favorites'} className="header__bubble-link">
            <HeartOutlined />
            {favorites.length !== 0 && <span className="header__bubble">{favorites.length}</span>}
         </Link>

         <Link to={'/cart'} className="header__bubble-link">
            <ShoppingCartOutlined />
            {items.length !== 0 && isAuth && <span className="header__bubble">{totalCount}</span>}
         </Link>
         {isAuth ? (
            <Link to={'/profile'} onClick={() => setModal(true)}>
               <UserOutlined className="logo__icons" />
            </Link>
         ) : (
            <Link to={'/login'} onClick={() => setModal(true)}>
               <UserOutlined className="logo__icons" />
            </Link>
         )}
         <span onClick={() => setModalCreateProduct(true)} className="create-product__header">
            +Продукт
         </span>
         <ModalEdit modal={modalCreateProduct} setModal={setModalCreateProduct}>
            {modalCreateProduct && <CreateProduct setModalCreateProduct={setModalCreateProduct} />}
         </ModalEdit>
      </>
   );
};
