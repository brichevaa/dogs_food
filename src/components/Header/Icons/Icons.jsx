import logoDog from './dog.svg';
import logoFavorite from './favorites.svg';
import logoPath from './path.svg';
import './icons.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CardContext } from '../../../context/cardContext';
import { UserContext } from '../../../context/userContext';
import { useSelector } from 'react-redux';
import { Modal } from '../../Modal/Modal';
import { CreateProduct } from '../../CreateProduct/CreateProduct';
import { BaseButton } from '../../BaseButton/BaseButton';

export const Icons = ({ count, setModal, modal }) => {
   const { isAuth } = useContext(UserContext);
   const { favorites } = useSelector((state) => state.products);
   const [modalCreateProduct, setModalCreateProduct] = useState(false);

   return (
      <>
         <Link to={'/favorites'} className="header__bubble-link">
            <img src={logoFavorite} alt="лого лайк" className="logo__icons" />
            {favorites.length !== 0 && <span className="header__bubble">{favorites.length}</span>}
         </Link>
         <Link to={'/cart'} className="header__bubble-link">
            <img src={logoPath} alt="лого корзина" className="logo__icons" />
            {count !== 0 && <span className="header__bubble">{count}</span>}
         </Link>
         {isAuth ? (
            <Link to={'/profile'} onClick={() => setModal(true)}>
               <img src={logoDog} alt="лого собака" className="logo__icons" />
            </Link>
         ) : (
            <Link to={'/login'} onClick={() => setModal(true)}>
               <img src={logoDog} alt="лого собака" className="logo__icons" />
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
