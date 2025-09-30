'use strict';
import axios from 'axios';

export const BaseUrlLocal = import.meta.env.VITE_BACKEND_URL;

console.log('BaseUrlLocal:', BaseUrlLocal);

const AxiosInstance = axios.create({
  baseURL: BaseUrlLocal,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(request => {
  return request;
});

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const errorObj = JSON.parse(JSON.stringify(error?.response ?? error));
     throw errorObj;
  },
);

export default AxiosInstance;
