import './formReviews.css';

export const FormReviews = ({ submitForm, children, title }) => {
   return (
      <>
         <form onSubmit={submitForm} className="form__reviews">
            <h1 className="form__title">{title}</h1>
            {children}
         </form>
      </>
   );
};
