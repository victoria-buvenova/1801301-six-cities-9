import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://9.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const HEADERS_FIELD_TOKEN = 'x-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });


  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers[HEADERS_FIELD_TOKEN] = token;
    }

    return config;
  });

  return api;
};

