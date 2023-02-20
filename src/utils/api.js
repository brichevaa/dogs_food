const config = {
   baseUrl: 'https://api.react-learning.ru',
   headers: {
      'content-type': 'application/json',
      Authorization:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VjZmFmMjU5Yjk4YjAzOGY3N2I2NjAiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2NTMwNDczLCJleHAiOjE3MDgwNjY0NzN9.MxviF4bN92IzQIkwOP_1XE4HMAs__NFD1lqOH6MN2Wk',
   },
};

const onResponse = (res) => {
   return res.ok ? res.json() : Promise.reject('Error');
};

class Api {
   // {baseUrl, headers}
   constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
   }
   getProductList() {
      return fetch(`${this._baseUrl}/products`, {
         headers: this._headers,
      }).then((res) => onResponse(res));
   }
   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: this._headers,
      }).then((res) => onResponse(res));
   }
   searchProducts(query) {
      return fetch(`${this._baseUrl}/products/search?query=${query}`, {
         headers: this._headers,
      }).then((res) => onResponse(res));
   }
   // like - true/false
   changeLikeProductStatus(productId, like) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         headers: this._headers,
         method: like ? 'PUT' : 'DELETE',
      }).then((res) => onResponse(res));
   }
   addLike(productId, like) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         headers: this._headers,
         method: 'PUT',
      }).then((res) => onResponse(res));
   }
   deleteLike(productId, like) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         headers: this._headers,
         method: 'DELETE',
      }).then((res) => onResponse(res));
   }
}

export const api = new Api(config);

// api.getProductList();

export const getProductList = () => {
   return fetch(`${config.baseUrl}/products`, {
      headers: config.headers,
   }).then((res) => onResponse(res));
};

export const getUserInfo = () => {
   return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
   }).then((res) => onResponse(res));
};

export const searchProducts = (query) => {
   return fetch(`${config.baseUrl}/products/search?query=${query}`, {
      headers: config.headers,
   }).then((res) => onResponse(res));
};

// export const funct = () => {
//  return fetch().then(onResponse)
// }
