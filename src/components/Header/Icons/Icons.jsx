import './icons.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/userContext';
import { useSelector } from 'react-redux';
import { Modal } from '../../Modal/Modal';
import { CreateProduct } from '../../CreateProduct/CreateProduct';
import { UserOutlined } from '@ant-design/icons';
import { HeartOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CardContext } from '../../../context/cardContext';

export const Icons = () => {
   const [modalCreateProduct, setModalCreateProduct] = useState(false);

   const { isAuth } = useContext(UserContext);
   const { basketItems, setModal } = useContext(CardContext);

   const { favorites } = useSelector((state) => state.products);
   const { items, totalPrice } = useSelector((state) => state.basket);

   const totalCount = items.reduce((sum, item) => sum + item.count, 0);

   return (
      <>
         <Link to={'/favorites'} className="header__bubble-link">
            <HeartOutlined />
            {/* <img src={logoFavorite} alt="лого лайк" className="logo__icons" /> */}
            {favorites.length !== 0 && <span className="header__bubble">{favorites.length}</span>}
         </Link>
         <Link to={'/cart'} className="header__bubble-link">
            {/* <img src={logoPath} alt="лого корзина" className="logo__icons" /> */}
            <ShoppingCartOutlined />
            {items.length !== 0 && <span className="header__bubble">{totalCount}</span>}
         </Link>
         {isAuth ? (
            <Link to={'/profile'} onClick={() => setModal(true)}>
               {/* <img src={logoDog} alt="лого собака" className="logo__icons" /> */}
               <UserOutlined className="logo__icons" />
            </Link>
         ) : (
            <Link to={'/login'} onClick={() => setModal(true)}>
               {/* <img src={logoDog} alt="лого собака" className="logo__icons" /> */}
               <UserOutlined className="logo__icons" />
            </Link>
         )}
         <span onClick={() => setModalCreateProduct(true)} className="create-product__header">
            Добавить продукт
         </span>
         <Modal modal={modalCreateProduct} setModal={setModalCreateProduct}>
            {modalCreateProduct && <CreateProduct setModalCreateProduct={setModalCreateProduct} />}
         </Modal>
      </>
   );
};
