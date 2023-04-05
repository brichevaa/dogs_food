import cn from 'classnames';
import s from './baseButton.module.css';

export const BaseButton = ({ children, color, className, ...props }) => {
   return (
      <button {...props} className={cn(s.btn, s[color], `${className ?? ''}`)}>
         {children}
      </button>
   );
};
