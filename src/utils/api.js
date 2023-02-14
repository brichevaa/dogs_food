const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
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

// export const funct = () => {
//  return fetch().then(onResponse)
// }
