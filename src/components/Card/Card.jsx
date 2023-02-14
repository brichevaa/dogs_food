import './card.css';
import { ReactComponent as Like } from './like.svg';

export const Card = ({ picture, name, wight, price, discount }) => {
  return (
    <div className="card">
      <div className="card__sticky card__sticky_top-left">
        <span className="card__discount">{discount}%</span>
      </div>
      <div className="card__sticky card__sticky_top-right">
        <button className="card__like">
          <Like className="card__liked" />
        </button>
      </div>
      <a href="/" className="card__link">
        <img src={picture} alt="карточка товара" className="card__image" />
        <div className="card__description">
          <span className="card__price">{price} ₽</span>
          <span className="card__wight">{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </a>
      <a href="/" className="btn btn_type_primary ">
        В корзину
      </a>
    </div>
  );
};
