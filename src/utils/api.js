const newHeaders = () => {
   return {
      headers: {
         'content-type': 'application/json',
         Authorization: localStorage.getItem('token'),
      },
   };
};

const config = {
   baseUrl: 'https://api.react-learning.ru',
   headers: {
      'content-type': 'application/json',
      Authorization: localStorage.getItem('token'),
   },
   newHeaders: newHeaders,
};

const onResponse = (res) => {
   return res.ok ? res.json() : Promise.reject('Error');
};

class Api {
   constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
      this._newHeaders = data.newHeaders;
   }
   getProductList(page = 1) {
      return fetch(`${this._baseUrl}/products?page=${page}`, {
         ...this._newHeaders(),
      }).then((res) => onResponse(res));
   }
   getProductById(id) {
      return fetch(`${this._baseUrl}/products/${id}`, {
         ...this._newHeaders(),
      }).then((res) => onResponse(res));
   }
   addProduct(data) {
      return fetch(`${this._baseUrl}/products`, {
         ...this._newHeaders(),
         method: 'POST',
         body: JSON.stringify(data),
      }).then((res) => onResponse(res));
   }
   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
         ...this._newHeaders(),
      }).then((res) => onResponse(res));
   }
   // PATCH https://api.react-learning.ru/users/me // изменение name и about
   changeUserInfo(body) {
      return fetch(`${this._baseUrl}/users/me`, {
         ...this._newHeaders(),
         method: 'PATCH',
         body: JSON.stringify(body),
      }).then((res) => onResponse(res));
   }
   // PATCH https://api.react-learning.ru/users/me/avatar // изменение avatar
   changeAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         ...this._newHeaders(),
         method: 'PATCH',
         body: JSON.stringify(avatar),
      }).then((res) => onResponse(res));
   }
   getUsers() {
      return fetch(`${this._baseUrl}/users`, {
         ...this._newHeaders(),
      }).then((res) => onResponse(res));
   }
   searchProducts(query) {
      return fetch(`${this._baseUrl}/products/search?query=${query}`, {
         ...this._newHeaders(),
      }).then((res) => onResponse(res));
   }
   // like - true / false
   changeLikeProductStatus(productId, like) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         ...this._newHeaders(),
         method: like ? 'PUT' : 'DELETE',
      }).then((res) => onResponse(res));
   }

   deleteLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         ...this._newHeaders(),
         method: 'DELETE',
      }).then((res) => onResponse(res));
   }
   addLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         ...this._newHeaders(),
         method: 'PUT',
      }).then((res) => onResponse(res));
   }
   addReview(productId, body) {
      return fetch(`${this._baseUrl}/products/review/${productId}`, {
         ...this._newHeaders(),
         method: 'POST',
         body: JSON.stringify(body),
      }).then((res) => onResponse(res));
   }
   //  DELETE https://api.react-learning.ru/products/review/:productId/:reviewId
   deleteReview(productId, reviewId) {
      return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
         ...this._newHeaders(),
         method: 'DELETE',
      }).then((res) => onResponse(res));
   }
}

export const api = new Api(config);

// api.getProductList();

// export const getProductList = () => {
//    return fetch(`${config.baseUrl}/products`, {
//       headers: config.headers,
//    }).then((res) => onResponse(res));
// };

// export const getUserInfo = () => {
//    return fetch(`${config.baseUrl}/users/me`, {
//       headers: config.headers,
//    }).then((res) => onResponse(res));
// };

// export const searchProducts = (query) => {
//    return fetch(`${config.baseUrl}/products/search?query=${query}`, {
//       headers: config.headers,
//    }).then((res) => onResponse(res));
// };

// export const funct = () => {
//  return fetch().then(onResponse)
// }
