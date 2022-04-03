import axios, { AxiosInstance } from 'axios';
import { AUTHORIZATION_STATUS } from '../constants';
import { store } from '../store';
import { requireAuthorization } from '../store/action';

const BASE_URL = 'https://9.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(undefined,
    (err) => {
      if (err.response.status === 401 || err.response.data.message === '401 Unauthorized') {
        store.dispatch(requireAuthorization(AUTHORIZATION_STATUS.NO_AUTH));
      }
      return Promise.reject(err);
    },
  );

  return api;
};

