import cn from 'classnames';
import './modal.css';
import { useCallback, useEffect } from 'react';

export const ModalEdit = ({ modal, children, setModal }) => {
   const onModalKeyDown = useCallback(
      (e) => {
         if (e.key === 'Escape') {
            setModal(false);
         }
      },
      [setModal]
   );

   useEffect(() => {
      document.addEventListener('keydown', onModalKeyDown);
      return () => {
         document.removeEventListener('keydown', onModalKeyDown);
      };
   }, [onModalKeyDown]);

   return (
      <>
         <div className={cn('modal', { ['active']: modal })}>
            <div
               className={cn('modal_content-edit', { ['active']: modal })}
               onClick={(e) => e.stopPropagation()}
            >
               {children}
            </div>
         </div>
      </>
   );
};
