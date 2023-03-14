import cn from 'classnames';
import './modal.css';

export const Modal = ({ modal, children, setModal }) => {
   return (
      <>
         <div
            className={cn('modal', { ['active']: modal })}
            onClick={() => setModal(false)}
         >
            <div
               className={cn('modal_content', { ['active']: modal })}
               onClick={(e) => e.stopPropagation()}
            >
               {children}
            </div>
         </div>
      </>
   );
};
