import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AUTHORIZATION_STATUS, HTTP_CODE } from '../constants';
import { store } from '../store';
import { requireAuthorization } from '../store/action';
import { getToken } from './token';

const BASE_URL = 'https://9.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const HEADERS_FIELD_TOKEN = 'x-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(undefined,
    (err) => {
      if (err.response.status === HTTP_CODE.UNAUTHORIZED || err.response.data.message === '401 Unauthorized') {
        store.dispatch(requireAuthorization(AUTHORIZATION_STATUS.AUTH));
      }
      return Promise.reject(err);
    },
  );

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers[HEADERS_FIELD_TOKEN] = token;
    }

    return config;
  });

  return api;
};

