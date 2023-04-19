import cn from 'classnames';
import './modal.css';
import { useCallback, useEffect } from 'react';

export const Modal = ({ modal, children, setModal }) => {
   const onModalKeyDown = useCallback(
      (e) => {
         // console.log({ e });
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
         <div
            className={cn('modal', { ['active']: modal })}
            // onClick={() => setModal(false)}
            // onKeyDown={(e) => onModalKeyDown(e)}
            // tabIndex={1}
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
