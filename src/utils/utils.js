import { useEffect, useState } from 'react';

export const getIssues = (number) => {
   if (number === 1) return ' товар';
   if (number > 1 && number < 5) return ' товара';
   if (number > 4 || !number) return ' товаров';
};

export const useDebounce = (value, delay) => {
   const [debounceValue, setDebounceValue] = useState(value);
   // const actualUser = useSelector(({ user }) => user.data);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDebounceValue(value);
      }, delay);

      return () => clearTimeout(timeout);
   }, [value]);

   return debounceValue;
};

export const findLike = (product, actualUser) =>
   product?.likes?.some((el) => el === actualUser._id);

export const filteredCards = (products) => {
   // return products;
   return products.filter((e) => e.author._id === '63ecfaf259b98b038f77b660');
};

export const getUser = (id) => {
   if (!users.length) return 'User';
   const user = users.find((e) => e._id === id);
   if (user?.avatar.includes('default-image')) {
      return {
         ...user,
         avatar:
            'https://avatars.mds.yandex.net/i?id=e67c20f98bdc512c5d3bc20c140f8fac-5719595-images-taas-consumers&n=27&h=480&w=480',
      };
   }

   return user;
};
