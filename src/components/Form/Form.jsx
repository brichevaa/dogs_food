import './form.css';
import cn from 'classnames';

export const Form = ({ submitForm, children, title, className }) => {
   return (
      <>
         <form onSubmit={submitForm} className={cn('form', `${className ?? ''} `)}>
            <h1 className="form__title">{title}</h1>
            {children}
         </form>
      </>
   );
};
